import client from "../../utils/database.js";

let getAddress = async(req,res)=>{
    try{
        let {userId}= req.user;
        let result = await client.query('select * from address where user_id=$1', [userId]);
        if(!result) res.send(200).json({});
        let address = result.rows;
        res.status(200).json({status:true, message : address});
    }catch(err){
        res.status(500).send({status:false, error:err.message});
    }
}

let getAddressById = async (req,res)=>{
    try{
        let {userId} = req.user;
        console.log(userId);
        const id = req.params.id;
        let result = await client.query('select name, mobilenum, pincode,locality, address, city, state, landmark, alternate_phno, address_type from address where id = $1 and user_id=$2',[id,userId]);
        res.status(200).send({status: true, message: result.rows[0]});
    }catch(err){
        res.status(403).send({status:false, error: err.message});
    }
}

    let postAddress = async (req,res)=>{
        try{
            let {userId} = req.user;
            console.log(userId);
            const {address,name,mobilenum, pincode, locality, city, state, landmark, alternate_phno, address_type, isDefault} = req.body;
            await client.query('insert into address (user_id,name,mobilenum, address,pincode, locality, city, state, landmark, alternate_phno, address_type, isDefault) values($1,$2,$3,$4,$5,$6,$7,$8, $9,$10,$11,$12)',[userId,name,mobilenum, address,pincode,locality, city, state, landmark, alternate_phno, address_type, isDefault]);
            res.status(200).send({status:true,message:'Address Inserted Successfully'});
        }
        catch(err){
            res.status(403).send({status:false,error:err.message});
        }
}

let updateAddress = async(req,res)=>{
    try{
        const id = req.params.id;
        let {userId} = req.user;
        const {name,mobilenum, address, pincode, locality, city, state, landmark, alternate_phno, address_type, isDefault} = req.body;
        await client.query('update address set locality =$1, city =$2, state =$3, landmark =$4, alternate_phno =$5, address_type =$6, isDefault =$7, address=$8, pincode=$9, name=$10, mobilenum=$11 where id=$12 and user_id=$13',[locality, city, state, landmark, alternate_phno, address_type, isDefault,address,pincode, name,mobilenum,id, userId]);
        res.status(200).send({status:true ,message:'Address Updated Successfully'});
    }catch(err){
        res.status(500).send({status: false,error:err.message});
    }
}

let deleteAddress = async(req,res)=>{
    try{
        const id = req.params.id;
        let {userId} = req.user;
        await client.query('delete from address where id=$1 and user_id =$2',[id,userId]);
        res.status(200).send({status:true, message:'Address Deleted Successfully'});
    }catch(err){
        res.status(500).send({status:false, error:err.message});
    }
}

export {getAddress, postAddress, updateAddress,deleteAddress,getAddressById};