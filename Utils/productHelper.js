function calculatePrice(mrp, discount){
    return mrp-(mrp*discount/100);
}

async function getSaveForLater(id){
    return await client.query(`select * from product_cart where user_id =${id}`);
}

export {calculatePrice, getSaveForLater};