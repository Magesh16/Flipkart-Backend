import client from '../../utils/database.js'
import { calculatePrice } from '../../utils/productHelper.js';

let getProducts =async (req,res)=>{
    try{
        const id = req.params.id;
        const variationNull = await client.query(`select * from variations where product_items_id = ${id}`);
        if(variationNull.rows.length == 0){
            var result = await client.query(`select * from product_items where id = ${id}`)
        }else{
        var result = await client.query(`select p.*,v.type, v.value,v.colour from product_items as p inner join variations as v on p.id = v.product_items_id where p.id=${id}`);
        }
        const reviewCount = await client.query(`select round(avg(rating)::numeric, 1) as avg_rating, count(comment)as commentCount, count(rating) as ratingCount from reviews where product_items_id = ${id}`);
        res.status(200).send(result.rows.map(ele=>{
            ele.price = calculatePrice(ele.mrp,parseInt(ele.discount))
            ele.price = ele.price.toFixed(0);
            ele.avg_rating = reviewCount.rows[0].avg_rating
            ele.ratingCount = reviewCount.rows[0].ratingcount
            ele.commentCount = reviewCount.rows[0].commentcount;
            return ele;
        }));
        }catch(err){
            res.status(403).send({status:false ,error:err.message});
        }
}



let postProducts = async (req,res)=>{
    try{
        let {category_type_id,image_url, name,mrp,discount, f_assured, avail_offer, delivery_pincode, highlights, description, specification,qty_in_stock, variation_id,offers } =req.body;
        await client.query('insert into product_items (category_type_id,image_url, name, mrp,discount, f_assured, avail_offer, delivery_pincode, highlights, description, specification,qty_in_stock, variation_id, offers) values ($1,$2,$3,$4,$5,$6,$7,$8, $9,$10,$11,$12,$13,$14)'
        ,[category_type_id,image_url, name, mrp,discount, f_assured, avail_offer, delivery_pincode, highlights, description, specification,qty_in_stock, variation_id, offers]);
        res.status(200).send({status:true ,message:"Inserted Successfully"})
    }catch(err){
        res.status(403).send({status:false ,error:err.message});
    }
}

export {getProducts, postProducts};