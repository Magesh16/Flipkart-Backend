import jwt from "jsonwebtoken";
import clientSMS from "./twilio.js";
import crypto from "crypto";
import client from "./database.js";

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
    // .catch((error) =>
    //   console.error(`Error sending message to ${toNumber}: ${error.message}`)
    // );

};

function generateToken(id) {
    return jwt.sign(id, process.env.ACCESS_TOKEN, { expiresIn: "7d" });
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
   return token
  }
  // let Refresh_Tokens = [];

// function authenticateRefToken(userId) {
//   let payload = { userId: userId };
//   let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
//   Refresh_Tokens.push(refreshToken);
//   if (refreshToken == null) return console.log(401);
//   if (!Refresh_Tokens.includes(refreshToken)) return res.sendStatus(403);

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
//     if (err) return console.log(403);
//     const accessToken = generateToken({ userId: user.id });
//     client.query("update userinfo set token= $1 where id =$2", [
//       accessToken,
//       userId,
//     ]);
//     console.log({ accessToken: accessToken });
//     // signin();
//   });
// }




export {sendOTPSMS, generateToken, signin, otpCacheSMS}