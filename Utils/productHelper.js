function calculatePrice(mrp, discount){
    return mrp-(mrp*discount/100);
}

export {calculatePrice};