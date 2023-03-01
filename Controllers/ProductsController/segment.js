import client from '../../Utils/database.js';

let getSegment = async(req,res)=>{
    try{
        const result = await client.query('select * from segment');
        res.status(200).send(result.rows);

    }catch(err){
        res.status(403).send({error: err});
    }
}

let getCategorySubcategory = (req,res)=>{
    
}

let postSegment = async(req,res)=>{
    try{
        const name = req.body.name;
        await client.query('insert into segment(name) values ($1)',[name]);
        res.status(200).send({message:"Inserted Successfully", status:true});
    }catch(err){
        res.status(403).send({message: "Not inserted", status:"false"});
    }
}


export {getSegment,postSegment};