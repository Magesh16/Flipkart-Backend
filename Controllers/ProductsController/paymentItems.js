import client from "../../Utils/database.js";
import dotenv from "dotenv";
dotenv.config();
import stripePackage from 'stripe';
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// let updateStatus =async(req,res)=>{
//   try{
//   let {userId} = req.user;
//   await client.query('update product_cart set status =$1 where user_id=$2',[true,userId]);
//   res.status(200).send("Payment successfull");
//   }catch(err){
//     res.status(403).send({error: err.message})
//   }
// }
let success = async (req,res)=>{
  try{
    console.log("hello");
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
    const productId = req.query.productid;
    await client.query('insert into payment (orders_id, user_id, status,receipt_url, transaction_id) values($1,$2,$3,$4,$5)',[productId,userId,true,receipturi,transactionid]);
    res.status(200).send('Payment Success');
  }catch(err){
    res.status(403).send({error:err.message})
  }
}

let failure = async (req,res)=>{
  try{
    console.log("hello");
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
    const productId = req.query.productid;
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
    console.log(result.rows);
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
      success_url: `http://localhost:3000/success/?sessionid={CHECKOUT_SESSION_ID}&userid= ${userId}&productid=${result.rows[0].id} `,
      cancel_url: `http://localhost:3000/cancel/?sessionid={CHECKOUT_SESSION_ID}&userid= ${userId}&productid=${result.rows[0].id} `, 
    }); 
    res.send({id: session.id,url: session.url }); 

  }

  export {paymentItem, success, failure};