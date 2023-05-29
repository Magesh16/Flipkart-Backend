import client from "../../utils/database.js";
import {signin, sendOTPSMS, otpCacheSMS, generateToken} from '../../utils/helper.js'
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
  const result = await client.query('select mobilenum,verify,token from userinfo where mobilenum =$1',[mobilenum]);
  let varify = result.rows[0]?.verify;
    if(varify){
      return res.status(200).send({status:false, message:"Already Registered"});
    }
    if((!varify) && result.rows[0]?.token){
      await sendOTPSMS(mobilenum);
      return res.status(200).cookie('token',result.rows[0].token, { maxAge: 60*60*24*20, httpOnly: true }).send({status:true,message:"verify the otp"});
    }
      await sendOTPSMS(mobilenum);
      await client.query(
        "insert into userinfo (mobilenum) values ($1) returning id",
        [mobilenum]);
      const data  = await client.query('select id from userinfo where mobilenum = $1',[mobilenum]);
      let id = data.rows[0].id;
      let token = generateToken(id);
      await client.query("update userinfo set token=$1 where mobilenum=$2",[token,mobilenum]);
      res.status(200).send({status:true,message:"verify the otp"})
  }catch(err){
    res.status(500).send({status:false, error:err.message});  
  }
};

let login = async (req, res) => {
  try {
    const mobilenum = req.body.mobilenum;
    const result = await client.query('select id from userinfo where mobilenum =$1',[mobilenum]);
    // console.log(result.rows[0].id);
    if(result.rows[0].id){
      sendOTPSMS(mobilenum);  
      return res.status(200).send({status:true,message:"verify the otp"})
    }else{
      res.status(403).send({status:false, message:"Please Register"});
    }
    
  } catch (err) {
    res.status(403).send({status:false, message:"Invalid Mobile Number Registered"});
  }
};

const verifyOTPSMS = async (req, res) => {
  let mobilenum = req.body.mobilenum;
  let userOTP = req.body.otp;
  const savedOtp = otpCacheSMS[mobilenum];
  // console.log(savedOtp);
  if (userOTP && savedOtp && savedOtp.otp == userOTP) {
     const token = await signin(mobilenum);
    await client.query('update userinfo set verify =true where mobilenum=$1',[mobilenum]);
    console.log("Login successfull");
    res.send({ status: true, message: "successfull" ,token:token});
  } else {
    res.status(401).send({ status: false, message: "Invalid OTP" });
  }
};

export { getUser, register, login, verifyOTPSMS };
