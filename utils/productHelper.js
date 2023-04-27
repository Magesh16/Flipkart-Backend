function calculatePrice(mrp, discount){
    return mrp-(mrp*discount/100);
}

async function getSaveForLater(id){
    return await client.query(`select * from product_cart where user_id =${id}`);
}

const generateOrderId = (userId) =>{
    return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '')+ userId;
}

const generateShipmentId = (userId) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const timestamp = Date.now().toString().slice(-6);
    const userIdString = String(userId).padStart(6, '0');
    return `${day}${month}${year}${userIdString}${timestamp}`;
  }

export {calculatePrice, getSaveForLater, generateOrderId, generateShipmentId};