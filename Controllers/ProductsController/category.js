import client from "../../Utils/database.js";

let getCategory = async(req,res)=>{
    try{
        let result = await client.query('select * from category');
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error:err})
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

export {getCategory, postCategory};