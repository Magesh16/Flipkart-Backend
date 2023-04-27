import twilio from 'twilio';
import dotenv from "dotenv";
dotenv.config();
const clientSMS = new twilio(
    process.env.YOUR_ACCOUNT_SID,
    process.env.YOUR_AUTH_TOKEN
  );

export default clientSMS;