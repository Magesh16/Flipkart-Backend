import client from "../../Utils/database.js";

let getSubcategory = async(req,res)=>{
    try{
        let result = await client.query('select * from category_type');
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error:err})
    }
}

let postSubcategory = async(req,res)=>{
    try{
        const {category_id, name} = req.body;
        await client.query('insert into category_type(category_id, name) values($1, $2)',[category_id, name]);
        res.status(200).send({message: "Inserted success", status:"true"});
    }catch(err){
        res.status(403).send({message: "Insertion Failed", status:"false"});
    }
}

export {getSubcategory, postSubcategory};