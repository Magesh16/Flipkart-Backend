function calculatePrice(mrp, discount){
    return mrp-(mrp*discount/100);
}

async function getSaveForLater(id){
    return await client.query(`select * from product_cart where user_id =${id}`);
}

const generateOrderId = (userId) =>{
    return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '')+ userId;
}

export {calculatePrice, getSaveForLater, generateOrderId};