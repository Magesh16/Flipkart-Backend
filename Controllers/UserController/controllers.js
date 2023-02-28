import client from "../../Utils/database.js";
import {signin, sendOTPSMS, otpCacheSMS} from '../../Utils/helper.js'
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

let register = (req, res) => {
  const mobilenum = req.body.mobilenum;
  client.query(
    "insert into UserInfo (mobilenum) values ($1) returning id",
    [mobilenum],
    (err, result) => {
      if (!err) {
        res.status(200).send({
          status: true,
          message: "Insertion successfull",
        });
      } else {
        res.status(403).send({
          status: false,
          message: "Not Inserted",
        });
      }
    }
  );
};

let login = async (req, res) => {
  try {
    const mobilenum = req.body.mobilenum;
    sendOTPSMS(mobilenum);  
    res.status(200).send({status:true,message:"verify the otp"})
  } catch (err) {
    res.sendStatus(403);
  }
};

const verifyOTPSMS = async (req, res) => {
  let mobilenum = req.body.mobilenum;
  let userOTP = req.body.otp;
  const savedOtp = otpCacheSMS[mobilenum];
  if (userOTP && savedOtp && savedOtp.otp == userOTP) {
     const token = await signin(mobilenum)
    res.send({ status: true, message: "Login successfull" ,token:token});
  } else {
    res.status(401).send({ status: false, message: "Invalid OTP" });
  }
};

export { getUser, register, login, verifyOTPSMS };
