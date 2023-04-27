import client from '../../utils/database.js';

const getShippedDetailsHelpCenter = async(req,res)=>{
    try{
    const {userId} = req.user;
    const result = await client.query(`select s.delivery_status, p.name, p.image_url[1] from shipment s
                                        inner join cart_order c on s.order_id = c.order_id
                                        inner join  product_items p on p.id = c.product_items_id where s.user_id =${userId}`);
    res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({status:false ,error: err.message});
    }
}

const getViewMore = async(req,res)=>{
    try{
        res.redirect(301,`/getOrders`);
    }catch(err){
        res.status(403).send({status:false ,error: err.message});
    }
}

export {getShippedDetailsHelpCenter,getViewMore}