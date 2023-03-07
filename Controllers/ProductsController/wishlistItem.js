import client from '../../Utils/database.js';

let getWishList = async(req,res)=>{
    try{
        let {userId}=req.user;
        // let rating  = await client.query(`select avg(rating), count(rating) from reviews where product_items_id in (select product_items_id from wishlist where user_id= ${userId}) group by product_items_id`);
        // console.log(rating.rows);
        let result =await client.query(`select pi.name, pi.mrp, pi.discount, (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100) as price, pi.f_assured, pi.image_url[1], round(avg(rating)::numeric, 1) as average_rating, count(r.rating) as rating_count 
        from product_items pi
        inner join wishlist w on w.product_items_id = pi.id 
        left join reviews r on r.product_items_id = pi.id 
        where w.user_id = ${userId} 
        group by pi.id`);
        res.status(200).send({message:result.rows, status:true});
    }catch(err){
        res.status(403).send({error:err.message});
    }
}

let postWishList = async(req,res)=>{
    try{
    let {userId} = req.user;
    let product_items_id = req.params.id;
    let result = await client.query(`select * from wishlist`);
    if(result.rows[0].product_items_id == product_items_id){
        res.status(200).send({message: "Product already on wishlist", status:false});
    }else{
    await client.query(`insert into wishlist(user_id, product_items_id) values($1,$2)`,[userId, product_items_id]);
    res.status(200).send("Inserted successfully");
    }
    }catch(err){
        res.status(403).send({error: err.message}); 
    }
}

let removeWishList = async(req,res)=>{
    try{
        let {userId} = req.user;    
        let product_items_id = req.params.id;
        await client.query('delete from wishlist where product_items_id =$1 and user_id =$2', [product_items_id,userId]);
        res.status(200).send("Removed successfully");
    }catch(err){
        res.status(403).send({error: err.message});
    }
}


export {getWishList,postWishList,removeWishList};