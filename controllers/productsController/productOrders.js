import client from '../../utils/database.js';

let getOrders =async (req,res)=>{
    try{
    const {userId} = req.user;
    const result = await client.query(`select pi.name,pi.image_url[1], (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100) as price, v.colour,v.value from product_items pi left join variations v on v.id = pi.variation_id  where pi.id in (select product_items_id from cart_order co join product_orders po on po.order_id = co.order_id where user_id =${userId})`);
    res.status(200).send({data: result.rows});
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

export {getOrders};