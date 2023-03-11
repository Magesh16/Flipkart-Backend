import client from '../../Utils/database.js';

export const generateOrderId = (userId) =>{
    return new Date().toUTCString() + userId;
}