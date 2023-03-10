import client from '../../Utils/database.js'
import { calculatePrice } from '../../Utils/productHelper.js';

let getProducts =async (req,res)=>{
    try{
        const id = req.params.id;
        // const result = await client.query(`select * from product_items where id=${id}`,);
        const result = await client.query(`select * from product_items as p inner join variations as v on v.id = p.variation_id where variation_id=${id}`);
        const reviewCount = await client.query(`select round(avg(rating)::numeric, 1) as avg_rating, count(comment)as commentCount, count(rating) as ratingCount from reviews where product_items_id = ${id}`);
        res.status(200).send(result.rows.map(ele=>{
            ele.price = calculatePrice(ele.mrp,parseInt(ele.discount))
            ele.avg_rating = reviewCount.rows[0].avg_rating
            ele.ratingCount = reviewCount.rows[0].ratingcount
            ele.commentCount = reviewCount.rows[0].commentcount;
            return ele;
        }));
        }catch(err){
            res.status(403).send({error:err.message});
        }
}

let postProducts = async (req,res)=>{
    try{
        let {category_type_id,image_url, name,mrp,discount, colour, f_assured,qty_in_stock, avail_offer, delivery_pincode, highlights, description, specification} =req.body;
        await client.query('insert into product_items (category_type_id,image_url, name, mrp,discount, f_assured, qty_in_stock, avail_offer, delivery_pincode, highlights, description, specification) values ($1,$2,$3,$4,$5,$6,$7,$8, $9,$10,$11,$12,$13)'
        ,[category_type_id,image_url, name, mrp,discount, colour, f_assured,qty_in_stock, avail_offer, delivery_pincode, highlights, description, specification]);
        res.status(200).send("Inserted Successfully")
    }catch(err){
        res.status(403).send({error:err.message});
    }
}

export {getProducts, postProducts};