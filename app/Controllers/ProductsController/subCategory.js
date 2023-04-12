import client from "../../Utils/database.js";
import {calculatePrice} from '../../Utils/productHelper.js';

let getSubcategory = async(req,res)=>{
    try{
        let result = await client.query('select * from category_type');
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error:err})
    }
}

let getSubcategoryProducts = async(req,res)=>{
    let id =req.params.id;
    try{
        let result = await client.query(`select p.image_url[1],p.name,p.highlights,p.mrp, p.discount from product_items as p left join category_type on p.category_type_id = category_type.id where category_type_id =${id}`);
        res.status(200).send(result.rows.map(ele =>{
            ele.price = calculatePrice(ele.mrp,parseInt(ele.discount));
            return ele;
        }))
    }catch(err){
        res.status(403).send({error:err.message})
    }

}

let postSubcategory = async(req,res)=>{
    try{
        const {category_id, name} = req.body;
        await client.query('insert into category_type(category_id, name) values($1, $2)',[category_id, name]);
        res.status(200).send({message: "Insertion success", status:"true"});
    }catch(err){
        res.status(403).send({message: "Insertion Failed", status:"false"});
    }
}

export {getSubcategory, postSubcategory,getSubcategoryProducts};