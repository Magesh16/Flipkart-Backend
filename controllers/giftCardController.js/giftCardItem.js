import client from '../../utils/database.js';

let getGiftCardItems = async(req,res)=>{
    try{
        let id = req.params.id;
        let result = await client.query(`select * from giftCards_item where id =${id}`);
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

export {getGiftCardItems};