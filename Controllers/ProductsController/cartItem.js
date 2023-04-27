import client from '../../Utils/database.js';
import {calculatePrice} from '../../Utils/productHelper.js'

let getCartDetails = async(req,res)=>{
    try{
    let {userId}  = req.user;
    const result = await client.query(`select c.id,p.name, p.image_url[1], p.mrp, p.discount, p.f_assured ,p.offers,c.quantity from product_items as p inner join product_cart as c on p.id = c.product_items_id where user_id = ${userId}`);
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
        const results =await client.query(`select p.name, p.image_url[1], p.mrp, p.discount, p.f_assured from product_items as p where id =${product_items_id}`);
        const mrp =  results.rows[0].mrp;
        const discount =  parseInt(results.rows[0].discount);
        const new_price = calculatePrice(mrp,discount);
        await client.query('update product_cart set quantity= quantity+ $1 where user_id=$2 and product_items_id=$3', [quantity, userId, product_items_id]);
       let quan = await client.query(`select quantity from product_cart where user_id=$1 and product_items_id=$2`, [userId, product_items_id])
        const updated_price = new_price*quan.rows[0].quantity;
        res.status(200).send({data: results.rows,quantity: quan.rows[0].quantity, updated_price: updated_price}); 
        
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

let saveForLater = async(req,res)=>{
    try{
        let {userId}= req.user;
        let product_items_id =req.params.id;
        await client.query(`update product_cart set status =$1 where user_id =$2 and product_items_id=$3`, [true, userId, product_items_id]);
        let result = await client.query(`select * from product_cart where status=${true}`)
        res.status(200).send({message: 'Save for later', data:result.rows,status: true});
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

let moveToCart = async(req,res)=>{
    try{
        let {userId}= req.user;
        let product_items_id =req.params.id;
        await client.query(`update product_cart set status =$1 where user_id =$2 and product_items_id=$3`, [false, userId, product_items_id]);
        let result = await client.query(`select * from product_cart where status=${false}`)
        res.status(200).send({message:'Moved to cart',data:result.rows, status:true});
    }catch(err){
        res.status(403).send({error: err.message, status:false});
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

export {getCartDetails, postCartDetails,updateCartDetails, removeCartDetails, saveForLater, moveToCart};