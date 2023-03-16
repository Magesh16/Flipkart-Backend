import client from '../../Utils/database.js'; 

let getCoupons = async(req,res)=>{
    try{
        let result =await client.query(`SELECT pi.id, pi.name, (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100) as price
        FROM product_items pi
        INNER JOIN coupons c ON c.min_price <= (pi.mrp - (pi.mrp * (pi.discount::integer)) / 100)
        `);
        
        res.status(200).send(result.rows);
        
    }catch(err){
        res.status(403).send({error:err.message});
    }
}

// let applyCoupon = async(req,res)=>{
//     try{
//         let {product_items_id, voucher_code, voucher_pin} = req.body;
//         let coupon = await client.query(`select min_price,discount_percentage from coupons where voucher_code =$1 and voucher_pin=$2`,[voucher_code,voucher_pin]);
//         let product = await client.query(`select * from product_items where id = ${product_items_id}`);
    
//         for(let i=0;i<product.rowCount;i++){
//             if(product.rows[i].mrp< coupon.rows.min_price){
//                 var discount_price = product.rows.mrp -(product.rows.mrp* coupon.rows.discount_percentage/100);  
//             }
//         }
//         console.log(discount_price);
//         res.status(200).send({data: product.rows,price: discount_price});

//     }catch(err){
//         res.status(403).send({error: err.message})
//     }
// }

let postCoupons = async(req,res)=>{
    try{
        const {voucher_code, voucher_pin,min_price, discount_percentage} =req.body;
        await client.query('insert into coupons (voucher_code, voucher_pin,min_price, discount_percentage) values($1,$2,$3,$4)',[voucher_code, voucher_pin,min_price, discount_percentage]);
        res.status(200).send("Insertion successful");
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

export {getCoupons,postCoupons};