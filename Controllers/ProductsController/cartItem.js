import client from '../../Utils/database.js';
import {calculatePrice, getSaveForLater} from '../../Utils/productHelper.js'

let getCartDetails = async(req,res)=>{
    try{
    let {userId}  = req.user;
    const result = await client.query(`select c.id,p.name, p.image_url[1], p.mrp, p.discount, p.f_assured, c.quantity from product_items as p inner join product_cart as c on p.id = c.product_items_id where user_id = ${userId}`);
    
    result.rows.map(ele=>{
        ele.price = calculatePrice(ele.mrp,parseInt(ele.discount));
        return ele;
    });
    const totalPrice = result.rows.reduce((acc, item)=> acc+item.price, 0);
    res.status(200).send({data:result.rows, totalPrice: totalPrice});
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

let postCartDetails = async(req,res)=>{
    try{
    let {userId}  = req.user;
    let {product_items_id} =req.body;
    let quantity=1;
    client.query('insert into product_cart (product_items_id, user_id,quantity) values ($1,$2,$3)',[product_items_id,userId, quantity]);
    res.status(200).send('Insertion Successfull');
}catch(err){
        res.status(403).send({error: err.message});
    }
}

let updateCartDetails = async(req,res)=>{
    try{
        const {userId}  = req.user;
        const product_items_id = req.params.id;
        const quantity = req.body.quantity;
        const getResult = req.result;
        console.log(getResult);
        const results =await client.query(`select p.name, p.image_url[1], p.mrp, p.discount, p.f_assured from product_items as p where id =${product_items_id}`);
        // console.log(results.rows);
        const mrp =  results.rows[0].mrp;
        const discount =  parseInt(results.rows[0].discount);
        const new_price = calculatePrice(mrp,discount);
        await client.query('update product_cart set quantity= quantity+ $1 where user_id=$2 and product_items_id=$3', [quantity, userId, product_items_id]);
       let quan = await client.query(`select quantity from product_cart where user_id=$1 and product_items_id=$2`, [userId, product_items_id])
        const updated_price = new_price*quan.rows[0].quantity;
        // console.log(updated_price);
        res.status(200).send({data: results.rows,quantity: quan.rows[0].quantity, updated_price: updated_price}); 
        
    }catch(err){
        res.status(403).send({error: err.message});
    }
}
let saveForLater = async(req,res)=>{
    try{
        const {userId}  = req.user;
        const cart_id =req.body.cart_id;
        await client.query(`insert into savedCart_products(cart_id, user_id) values ($1,$2)`, [cart_id, userId])
        let result = await getSaveForLater(userId);
        console.log(result);
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error: err.message});
    }
}


let removeCartDetails = async(req,res)=>{
    try{
        const {userId} = req.user;
        const product_items_id = req.params.id;
        await client.query('delete from product_cart where user_id=$1 and product_items_id=$2', [userId, product_items_id]);
        res.status(200).send('Deletion Successfull');
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

export {getCartDetails, postCartDetails,updateCartDetails, removeCartDetails, saveForLater};