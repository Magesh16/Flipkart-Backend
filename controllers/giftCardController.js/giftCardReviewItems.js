import client from "../../utils/database.js";

let getGiftCardReviews =async(req,res)=>{
    try{
        let giftcard_item_id = req.params.id;
        let result =await client.query(`select rating, comment from giftcarditems_review where giftcard_item_id = ${giftcard_item_id}`);
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

let postGiftCardReviews = async(req,res)=>{
    try{
        let {userId} = req.user;
        let check = await client.query(`select status from product_orders where user_id =${userId}`);
        if(check.rows[0].status == true){
            let {giftcard_item_id, rating, comment} = req.body;
            await client.query('insert into giftcarditems_review (giftcard_item_id, rating, comment, user_id) values($1,$2,$3, $4)', [giftcard_item_id, rating, comment, userId]);
            res.status(200).send("Review submitted");
        }else{
            res.status(403).send("You cannot add review as you didn't purchase the product");
        }
    }catch(err){
        res.status(403).send({error: err.message})
    }
}
let updateGiftCardLikeCount = async(req,res)=>{
    try{
        let id = req.params.id;
        let check = await client.query(`select count(*) from giftcarditems_review where id=${id}`);
        if(check.rows[0].count > 0){
            await client.query('update giftcarditems_review set likes_count = likes_count+1 where id =$1',[id]);
            res.status(200).send("Like added to the product");
        }else{
            res.status(403).send("Id not found")
        }
    }catch(err){
        res.status(403).send({error: err.message});
    }
}
let upateGiftCardDislikeCount = async(req,res)=>{
    try{
        let id = req.params.id;
        let check = await client.query(`select count(*) from giftcarditems_review where id=${id}`);
        if(check.rows[0].count > 0){
        await client.query('update giftcarditems_review set dislikes_count = dislikes_count+1 where id =$1',[id]);
        res.status(200).send("Dislike added to the product");
        }else{
            res.status(403).send("Id not found")
        }
    }catch(err){
        res.status(403).send({error: err.message});
    }
}


export {getGiftCardReviews, postGiftCardReviews,updateGiftCardLikeCount,upateGiftCardDislikeCount}