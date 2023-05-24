import client from '../../utils/database.js';

let getDeliveryStatus = async(req,res)=>{
    try{
        let {userId} = req.user;
        let trackingNum = req.params.id;
        let result = await client.query(`select delivery_status, order_id from shipment where tracking_num = ${trackingNum} and user_id =${userId}`);
        res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error:err.message});
    }
}

let updateDeliveryStatus = async(req,res)=>{
    try{
    let {userId} = req.user;
    let status = req.body.delivery_status;
    let trackingNum = req.body.tracking_num;
    let result = await client.query('update shipment set delivery_status = $1 where tracking_num =$2 and user_id=$3',[status, trackingNum, userId]);
    console.log(result.rows);
    res.status(200).send({status:true, message:'updation successfull'});
    }catch(err){
        res.status(403).send({status: false, error:err.message});
    }
}

export {updateDeliveryStatus, getDeliveryStatus};
