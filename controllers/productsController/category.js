import client from "../../utils/database.js";
import {calculatePrice} from '../../utils/productHelper.js';

let getCategory = async(req,res)=>{
    try{
        let result = await client.query('SELECT * from category');
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error:err})
    }
}

let getAllSubcategoryProducts = async(req,res)=>{
    try{
        let result = await client.query('select p.image_url[1],p.name,p.highlights,p.mrp, p.discount from product_items as p left join category_type on p.category_type_id = category_type.id');
        res.status(200).send(result.rows.map(ele=>{
            ele.price = calculatePrice(ele.mrp,parseInt(ele.discount))
            return ele;
        }));
    }catch(err){
        res.status(403).send({status:false ,error: err.message});
    }
}

let postCategory = async(req,res)=>{
    try{
        const {segment_id, name} = req.body;
        await client.query('insert into category(segment_id, name) values($1, $2)',[segment_id, name]);
        res.status(200).send({message: "Inserted success", status:"true"});
    }catch(err){
        res.status(403).send({message: "Insertion Failed", status:"false"});
    }
}

export {getCategory, postCategory,getAllSubcategoryProducts};