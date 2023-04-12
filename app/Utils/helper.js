import jwt from "jsonwebtoken";
import clientSMS from "./twilio.js";
import crypto from "crypto";
import client from "./database.js";
import transporter from "../Utils/nodemailer.js";

let otpCacheSMS = {};
const sendOTPSMS = async (mobilenum) => {
  let otp = crypto.randomInt(10000, 999999);
  let expirationOTP = Date.now() + 5 * 60 * 2000;
  const toNumber = mobilenum;
  console.log(toNumber);
  otpCacheSMS[toNumber] = { otp, expirationOTP };
   await clientSMS.messages
    .create({
      body: `Here is the otp for Flipkart login : ${otp}`,
      from: "+17542223474",
      to: toNumber,
    })
    .then((message) =>
     console.log(`Message sent to ${message.to}: ${message.body}`)
    )
};

function generateToken(id) {
    return jwt.sign(id, process.env.ACCESS_TOKEN, { expiresIn: "15d" });
  }

async function signin(mobilenum) {
    const result = await client.query(
      "select token,id from userinfo where mobilenum =$1",
      [mobilenum]
    );
    let token = result.rows[0].token;
    const userId = result.rows[0].id;
    let payload = { userId: userId };
  
    if (token == null) {
      console.log("token null");
      token = generateToken(payload);
      client.query("update userinfo set token =$1 where id = $2", [
        token,
        userId,
      ]); 
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
        if (err) {
          token = generateToken(payload);
          client.query("update userinfo set token =$1 where id = $2", [
            token,
            userId,
          ]);
        }
      });
    }
   return token;
  }
           
let otpCache = {};

const sendEmail = (id)=> {
  const userId = id;
  let otp = crypto.randomInt(100000, 999999);
  let expirationOTP = Date.now() + 5 * 60 * 1000;

  if (!userId) {
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
        console.log(ToMail);
        const mailOptions = {
          from: "magidexter@gmail.com",
          to: ToMail,
          subject: "verification code from magi ✔",
          text: `This is the OTP : ${otp}`,
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




export {sendOTPSMS, generateToken, signin,sendEmail, otpCacheSMS, otpCache}