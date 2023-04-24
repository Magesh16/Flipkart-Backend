import client from "../../Utils/database.js";
import {otpCacheSMS, sendOTPSMS, sendEmail, otpCache} from  '../../Utils/helper.js';

let updateProfile1 = async(req,res)=>{
    let {firstName, lastName, gender} = req.body;
    let {userId} = req.user;
    try{
      await client.query('update userinfo set firstName =$1, lastName =$2, gender=$3 where id =$4', [firstName, lastName, gender, userId]);
          res.status(200).send({
              status: true,
              message: "Updated successfully",
          })
    }catch(e){
      res.status(403).send({
        status: false,
        message: "Not updated",
    })
    }
}
let updateProfileEmail = async(req,res)=>{
    let email = req.body.email;
    let {userId} = req.user;
    try{
      const existingEmail = await client.query('select email from userinfo where id=$1', [userId]);
      if(existingEmail.rows[0].email == email){
        res.status(200).send('Email Exist');
      }else{
            sendEmail(userId);
            const result = await client.query('select mobilenum from userinfo where id=$1',[userId]);
            console.log(result.rows[0].mobilenum);
            const mobilenum = result.rows[0].mobilenum;
            sendOTPSMS(mobilenum);
            res.status(200).send({
                status: true,
                message: "Updated successfully",
            })
          }
        }
          catch(err){
            res.status(403).send({
              status: false,
              message: "Not updated",
          })
        }
      }


const verifyOTPEMAILSMS = async(req,res)=>{
  let {userId} = req.user;
  const result = await client.query('select email, mobilenum from userinfo where id=$1',[userId]);
  const email = result.rows[0].email;
  const mobilenum = result.rows[0].mobilenum;
  const emailOTP = req.body.emailOTP;
  const SMSOTP = req.body.SMSOTP;
  // console.log(emailOTP, SMSOTP);
  const savedEmailOTP = otpCache[email];
  const savedSMSOTP = otpCacheSMS[mobilenum];
  // console.log(savedEmailOTP.otp, savedSMSOTP.otp);
  // console.log(savedEmailOTP.otp == emailOTP);
  // console.log(savedSMSOTP.otp == SMSOTP);
  if (savedSMSOTP.otp == SMSOTP && savedEmailOTP.otp == emailOTP) {
    await client.query('update userinfo set email =$1 where id =$2', [email, userId]);
    res.status(200).send({status:true ,message: "Email Updated successfully"});
  }else{
    res.status(401).send({ status: false, message: "Invalid OTP" });
  }
}

const verifyOtp = (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const savedOtp = otpCache[email];
    if (otp && savedOtp && savedOtp.otp == otp) {
      res.send("OTP verified successfully");
    } else {
      res.status(401).send({ status: false, message: "Invalid OTP" });
    }
  };

const updateProfileMobileNum = async (req,res)=>{
  const newMobilenum = req.body.mobilenum;
  let {userId} = req.user
  try{
    const existingMobileNum = await client.query('select mobilenum from userinfo where id=$1', [userId]);
    const oldMobilenum = existingMobileNum.rows[0].mobilenum
    if(newMobilenum == oldMobilenum){
      res.status(200).send({status:false ,message: "Mobile number Exist"});
    }else{
      sendOTPSMS(newMobilenum);
      sendOTPSMS(oldMobilenum);
      res.status(200).send({status:true ,message: "Mobile number updated successfully"});
    }
  }catch(err){
    res.status(500).send({status:false ,message: "Mobile number update failed"});
  }
}

const verifyOldNewMobileOTP = async(req,res)=>{
  const newOTP = req.body.newOTP;
  const oldOTP = req.body.oldOTP;
  let {userId} = req.user;
  let Newmobilenum = req.body.mobilenum;
  let result = await client.query('select mobilenum from userinfo where id=$1', [userId]);
  const Oldmobilenum = result.rows[0].mobilenum;
  const savedOldOTP  = otpCacheSMS[Oldmobilenum].otp;
  const savedNewOTP = otpCacheSMS[Newmobilenum].otp;
  if(savedOldOTP == oldOTP && savedNewOTP == newOTP){
    await client.query('update userinfo set mobilenum =$1 where id =$2', [Newmobilenum, userId]);
    res.status(200).send({status: true, message:"Mobile updated successfully"});
  }else{
    res.status(403).send({status: false, message:"OTP not verified"});
  }

}

export {updateProfile1, updateProfileEmail, verifyOtp, verifyOTPEMAILSMS, updateProfileMobileNum, verifyOldNewMobileOTP};

