import client from '../../utils/database.js';

let getOrders =async (req,res)=>{
    try{
    const {userId} = req.user;
    const result = await client.query(`SELECT pi.name, pi.image_url[1],
                                            (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100) AS price,
                                            v.colour, v.value, to_char(po.created_At, 'Mon DD, YYYY') AS delivered_date
                                        FROM
                                            product_items pi
                                        LEFT JOIN
                                            variations v ON v.id = pi.variation_id
                                        LEFT JOIN
                                            cart_order co ON pi.id = co.product_items_id
                                        LEFT JOIN
                                            product_orders po ON po.order_id = co.order_id
                                        WHERE
                                            po.user_id = ${userId};
  `);
    res.status(200).send({status: true,message: result.rows});
    }catch(err){
        res.status(403).send({status:false , error: err.message});
    }
}

export {getOrders};