import client from "../../Utils/database.js";
import dotenv from "dotenv";
dotenv.config();
import stripePackage from 'stripe';
import { generateOrderId } from "./productOrders.js";
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

let success = async (req,res)=>{
  try{
    const sessionid  = req.query.sessionid
    const session  = await stripe.checkout.sessions.retrieve(sessionid)
    if(!session) return next(new ErrorHandler("session object not found",500))
    const payment  = await stripe.paymentIntents.retrieve(session.payment_intent)
     
    const charges = await stripe.charges.retrieve(
      payment.latest_charge
    );
    if(!session) return next("paymentIntent object not found");
    // console.log(payment,sessionid,charges);
    const transactionid  = charges.balance_transaction;
    const receipturi = charges.receipt_url;
    const userId  = req.query.userid;
    const orderId = req.query.orderid;
    await client.query('insert into payment (order_id, user_id, status,receipt_url, transaction_id) values($1,$2,$3,$4,$5)',[orderId,userId,true,receipturi,transactionid]);
    await client.query('update product_orders set status=$1 where order_id =$2',[true, orderId]);
    res.status(200).send('Payment Success');
  }catch(err){
    res.status(403).send({error:err.message})
  }
}

let failure = async (req,res)=>{
  try{
    const sessionid  = req.query.sessionid
    const session  = await stripe.checkout.sessions.retrieve(sessionid)
    if(!session) return next(new ErrorHandler("session object not found",500))
    const payment  = await stripe.paymentIntents.retrieve(session.payment_intent)
     
    const charges = await stripe.charges.retrieve(
      payment.latest_charge
    );
    if(!session) return next("paymentIntent object not found");
    // console.log(payment,sessionid,charges);
    const transactionid  = charges.balance_transaction;
    const receipturi = charges.receipt_url;
    const userId  = req.query.userid;
    const orderId = req.query.orderid;
    await client.query('insert into payment (product_items_id, user_id, status,receipt_url, transaction_id) values($1,$2,$3,$4,$5)',[productId,userId,false,receipturi,transactionid]);
    res.status(403).send('Payment Failure');
  }catch(err){
    res.status(403).send({error:err.message})
  }
}

let paymentItem = async (req, res) => { 
    const {userId} = req.user;
    // const { product } = req.body;
    const result = await client.query(`select pi.id, pi.name, (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100) as price, pc.quantity from product_items pi inner join product_cart pc on pi.id = pc.product_items_id where user_id =${userId}`);
    if(result.rows == 0){
      res.status(200).send('Product Not found in the cart');
    }
    // const cartItems  = await client.query(`select product_items_id from cart_order where user_id = ${userId}`) 
    const orderId  = generateOrderId(userId)
    await client.query(`insert into product_orders(status,user_id,quantity,order_id) values($1,$2,$3,$4)`,[false,userId,result.rowCount,orderId])

    for(let i =0;i<result.rowCount;i++){
      await client.query(`insert into cart_order(order_id,product_items_id,quantity)values($1,$2,$3)`,[orderId,result.rows[i]['id'],result.rows[i]['quantity'] ])
    }
    await client.query('delete from product_cart where user_id=$1', [userId]);
    // console.log(result.rows);
    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ["card"], 
        line_items: result.rows.map((ele)=>{
  return({
        price_data:{
        currency:'inr',
        product_data:{
        name:ele.name,
  },
      unit_amount:ele.price*100},
      quantity:ele.quantity
  })
  }),
      
      mode: "payment", 
      success_url: `http://localhost:3000/success/?sessionid={CHECKOUT_SESSION_ID}&userid= ${userId}&orderid=${orderId} `,
      cancel_url: `http://localhost:3000/cancel/?sessionid={CHECKOUT_SESSION_ID}&userid= ${userId}&orderid=${orderId} `, 
    }); 
    res.send({id: session.id,url: session.url }); 

  }
  export {paymentItem, success, failure};