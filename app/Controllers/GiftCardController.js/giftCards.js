import client from "../../Utils/database.js";

const getGiftCards = async(req,res)=>{
    try{
    let result = await client.query(`select g.id,g.name, gi.image_url from giftCards g 
                                    inner join giftCards_category gc on gc.giftCard_id = g.id
                                    inner join giftCards_item gi on gi.giftCard_category_id = gc.id `);
    res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error: err.message});
    }
}

export {getGiftCards};