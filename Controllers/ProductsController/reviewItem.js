import client from '../../Utils/database.js';

let getReviews =async(req,res)=>{
    try{
        let product_items_id = req.params.product_items_id;
        console.log(product_items_id);
        let result =await client.query(`select rating, comment from reviews where product_items_id = ${product_items_id}`);
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

let postReviews = async(req,res)=>{
    try{
        let {userId} = req.user;
        let check = await client.query(`select status from product_orders where user_id =${userId}`);
        if(check.rows[0].status == true){
            let {product_items_id, rating, comment} = req.body;
            await client.query('insert into reviews (product_items_id, rating, comment, user_id) values($1,$2,$3, $4)', [product_items_id, rating, comment, userId]);
            res.status(200).send("Review submitted");
        }else{
            res.status(403).send("You cannot add review as you didn't purchase the product");
        }
    }catch(err){
        res.status(403).send({error: err.message})
    }
}



export {getReviews,postReviews}