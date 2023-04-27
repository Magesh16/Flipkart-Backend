import client from '../../Utils/database.js'; 

let getCoupons = async(req,res)=>{
    try{
        let result =await client.query(`SELECT pi.id, pi.name, (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100) as price
        FROM product_items pi
        INNER JOIN coupons c ON c.min_price <= (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100)
        `);
        
        res.status(200).send(result.rows);
        
    }catch(err){
        res.status(403).send({status:false ,error:err.message});
    }
}

let postCoupons = async(req,res)=>{
    try{
        const {voucher_code, voucher_pin,min_price, discount_percentage} =req.body;
        await client.query('insert into coupons (voucher_code, voucher_pin,min_price, discount_percentage) values($1,$2,$3,$4)',[voucher_code, voucher_pin,min_price, discount_percentage]);
        res.status(200).send({status:true ,message:"Insertion successful"});
    }catch(err){
        res.status(403).send({status:false ,error: err.message});
    }
}

export {getCoupons,postCoupons};