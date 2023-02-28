import client from "../../Utils/database.js";

let getAddress = async(req,res)=>{
    try{
        let result = await client.query('select * from address');
        let address = result.rows;
        res.status(200).json({address : address});
    }catch(err){
        res.status(500).send({error:err});
    }
}

let postAddress = async (req,res)=>{
    try{
        let {userId} = req.user;
        const {locality, city, state, landmark, alternate_phno, address_type, isDefault} = req.body;
        await client.query('insert into address (user_id, locality, city, state, landmark, alternate_phno, address_type, isDefault) values($1,$2,$3,$4,$5,$6,$7,$8)',[userId,locality, city, state, landmark, alternate_phno, address_type, isDefault]);
        res.status(200).send('Address Inserted Successfully');
    }
    catch(err){
        res.status(500).send({error:err.message});
    }
}

let updateAddress = async(req,res)=>{
    try{
        const id = req.params.id;
        const {locality, city, state, landmark, alternate_phno, address_type, isDefault} = req.body;
        // let id = await client.query('select id from address where user_id =$1', [userId]);
        await client.query('update address set locality =$1, city =$2, state =$3, landmark =$4, alternate_phno =$5, address_type =$6, isDefault =$7 where id=$8',[locality, city, state, landmark, alternate_phno, address_type, isDefault, id]);
        res.status(200).send('Address Updated Successfully');
    }catch(err){
        res.status(500).send({error:err.message});
    }
}

let deleteAddress = async(req,res)=>{
    try{
        // let {userId} = req.user;
        // let id = await client.query('select id from address where user_id =$1', [userId]);
        const id = req.params.id;
        await client.query('delete from address where id=$1',[id]);
        res.status(200).send('Address Deleted Successfully');
    }catch(err){
        res.status(500).send({error:err.message});
    }
}

export {getAddress, postAddress, updateAddress,deleteAddress};