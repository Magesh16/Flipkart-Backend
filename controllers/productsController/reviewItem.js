import client from '../../utils/database.js';

let getReviews =async(req,res)=>{
    try{
        let product_items_id = req.params.product_items_id;
        let result =await client.query(`select rating, comment from reviews where product_items_id = ${product_items_id}`);
        res.status(200).send({status:true, message: result.rows});
    }catch(err){
        res.status(403).send({status:false, error: err.message});
    }
}

let postReviews = async(req,res)=>{
    try{
        let {userId} = req.user;
        let check = await client.query(`select status from product_orders where user_id =${userId}`);
        if(check.rows[0].status == true){
            let {product_items_id, rating, comment} = req.body;
            await client.query('insert into reviews (product_items_id, rating, comment, user_id) values($1,$2,$3, $4)', [product_items_id, rating, comment, userId]);
            res.status(200).send({status: true, message:"Review submitted"});
        }else{
            res.status(403).send({status:false, message:"You cannot add review as you didn't purchase the product"});
        }
    }catch(err){
        res.status(403).send({status: false,error: err.message})
    }
}

let updateLikeCount = async(req,res)=>{
    try{
        let id = req.params.id;
        const result = await client.query('update reviews set likes_count = likes_count+1 where id =$1',[id]);
        if (result.rowCount === 0) {
            res.status(404).send({ status: false, error: "ID not found" });
        }else{
        res.status(200).send("Like added to the product");
        }
    }catch(err){
        res.status(403).send({error: err.message});
    }
}
let updateDislikeCount = async(req,res)=>{
    try{
        let id = req.params.id;
        const result = await client.query('update reviews set dislikes_count = dislikes_count+1 where id =$1',[id]);
        if (result.rowCount === 0) {
            res.status(404).send({ status: false, error: "ID not found" });
        }else{
        res.status(200).send({status:true, message:"Dislike added to the product"});
        }
    }catch(err){
        res.status(403).send({status:false, error: err.message});
    }
}


export {getReviews,postReviews,updateLikeCount,updateDislikeCount}