import client from "../../utils/database.js";

const getCardCategory = async(req,res)=>{
    try{
        let id = req.params.id;
        let result = await client.query(`select gc.name,gi.mrp, gi.discount, (gi.mrp - (gi.mrp * (gi.discount::integer)) / 100) as price, gi.image_url, gv.value as denomination from giftCards_category gc 
                                         inner join giftCards_item gi on gc.id = gi.giftCard_category_id
                                         inner join giftCard_variations gv on gv.giftcard_item_id = gi.id where gc.id =${id}`);
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error:err.message});
    }
}

export {getCardCategory};