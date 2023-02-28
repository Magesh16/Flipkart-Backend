import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'magidexter@gmail.com',
      pass: 'upitekvecmalmtpr'
    }
  });

 export default transporter;