import client from "../../Utils/database.js";
import {signin, sendOTPSMS, otpCacheSMS, generateToken} from '../../Utils/helper.js'
import dotenv from "dotenv";


dotenv.config();

let getUser = async (req, res) => {
  const result = await client.query("select * from UserInfo");
  if (result) {
    res.status(200).send(result.rows);
    return;
  } else {
    res.status(404).send("error");
    return;
  }
};

let register = async(req, res) => {
  try{
  const mobilenum = req.body.mobilenum;
  const result = await client.query('select id from userinfo where mobilenum =$1',[mobilenum]);
    if(result.rows[0].id){
      return res.status(403).send("Already Registered");
    }
      await client.query(
        "insert into userinfo (mobilenum) values ($1) returning id",
        [mobilenum]);
      const data  = await client.query('select id from userinfo where mobilenum = $1',[mobilenum]);
      let id = data.rows[0].id;
      let token = generateToken(id);
      await client.query("update userinfo set token=$1 where mobilenum=$2",[token,mobilenum]);
      sendOTPSMS(mobilenum);
      res.status(200).send({token});
  
  }catch(err){
    res.status(500).send(err);  
  }

};

let login = async (req, res) => {
  try {
    const mobilenum = req.body.mobilenum;
    const result = await client.query('select id from userinfo where mobilenum =$1',[mobilenum]);
    if(result.rows[0].id){
      sendOTPSMS(mobilenum);  
      res.status(200).send({status:true,message:"verify the otp"})
    }else{
      res.status(403).send({status:false, message:"Please Register"});
    }
    
  } catch (err) {
    res.sendStatus(403);
  }
};

const verifyOTPSMS = async (req, res) => {
  let mobilenum = req.body.mobilenum;
  let userOTP = req.body.otp;
  const savedOtp = otpCacheSMS[mobilenum];
  console.log(savedOtp);
  if (userOTP && savedOtp && savedOtp.otp == userOTP) {
     const token = await signin(mobilenum);
    await client.query('update userinfo set verify =true where mobilenum=$1',[mobilenum]);
    res.send({ status: true, message: "successfull" ,token:token});
  } else {
    res.status(401).send({ status: false, message: "Invalid OTP" });
  }
};

// const logout = async(req,res)=>{
//   try{
//     let {userId} =  req.user;
//     let authHeader =  req.headers['authorization'].split(' ')[1];
//     console.log(authHeader);
//     jwt.sign(userId,authHeader, {expiresIn:'1s'});
//     res.status(200).send("Logout successfully");
//   }catch(err){
//     res.status(403).send({status:false,message:"logout error"});
//   }
// }

export { getUser, register, login, verifyOTPSMS };
