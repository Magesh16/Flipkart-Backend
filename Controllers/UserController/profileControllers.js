import client from "../../Utils/database.js";
import transporter from "../../Utils/nodemailer.js";
import {otpCacheSMS, sendOTPSMS} from  '../../Utils/helper.js';
import crypto from 'crypto';

let updateProfile1 =(req,res)=>{
    let {firstName, lastName, gender} = req.body;
    let {userId} = req.user;
    client.query('update userinfo set firstName =$1, lastName =$2, gender=$3 where id =$4', [firstName, lastName, gender, userId] ,(err)=>{
        if(!err){
            res.status(200).send({
                status: true,
                message: "Updated successfully",
            })
        }else{
            res.status(403).send({
                status: false,
                message: "Not updated",
            })
        }
    })
}

let updateProfileEmail = async(req,res)=>{
    let email = req.body.email;
    let {userId} = req.user;
    try{
          await client.query('update userinfo set email =$1 where id =$2', [email, userId]);
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
          catch(err){
            res.status(403).send({
              status: false,
              message: "Not updated",
          })
        }
      }
           
let otpCache = {};

const sendEmail = (id)=> {
  const userId = id;
  let otp = crypto.randomInt(100000, 999999);
  let expirationOTP = Date.now() + 5 * 60 * 1000;

  if (!userId) {
    // res.status(400).send();
    console.log("User ID is missing from the query string");
    return;
  }
  client.query(
    "select email from userinfo where id= $1",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("Error retrieving email address");
      } else {
        const ToMail = result.rows[0].email;
        otpCache[ToMail] = { otp, expirationOTP };
        // console.log(ToMail);
        const mailOptions = {
          from: "magidexter@gmail.com",
          to: ToMail,
          subject: "verification code from magi ✔",
          text: `This is the OTP : ${otp}`,
          // html: '<b>This is the testing mail</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            console.log("Error sending email");
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });
      }
    }
  );
};

const verifyOTPEMAILSMS = async(req,res)=>{
  let {userId} = req.user;
  const result = await client.query('select email, mobilenum from userinfo where id=$1',[userId]);
  const email = result.rows[0].email;
  const mobilenum = result.rows[0].mobilenum;
  const emailOTP = req.body.emailOTP;
  const SMSOTP = req.body.SMSOTP;
  console.log(emailOTP, SMSOTP);
  const savedEmailOTP = otpCache[email];
  const savedSMSOTP = otpCacheSMS[mobilenum];
  console.log(savedEmailOTP.otp, savedSMSOTP.otp);

  console.log(savedEmailOTP.otp == emailOTP);
  console.log(savedSMSOTP.otp == SMSOTP);
  if (savedSMSOTP.otp == SMSOTP && savedEmailOTP.otp == emailOTP) {
    res.status(200).send({status:true ,message: "OTP verified successfully"});
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

export {updateProfile1, updateProfileEmail, verifyOtp, verifyOTPEMAILSMS};