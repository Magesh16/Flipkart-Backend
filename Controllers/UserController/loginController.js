import client from '../../Utils/database.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()

let newlogin = async(req,res)=>{
    try{
        let mobilenum = req.body.mobilenum;
        const userId = await client.query('select id from userinfo where mobilenum =$1', [mobilenum]);
        let tokens = generateToken(userId);
        res.cookie('refresh_token',tokens.refreshToken, {httpOnly:true});
        res.json(tokens);
    }catch(err){
        res.status(403).json({error: err.message})
    }
}
let newRefToken = (req,res)=>{
    try{
        const refreshToken = req.cookies.refresh_token;
        if(refreshToken == null) return res.status(401).send("Null refresh Token");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err,user)=>{
            if(err) res.status(403).json({error: err.message});
            let tokens = generateToken(user);
            res.cookie('refresh_token',tokens.refreshToken, {httpOnly:true});  
            res.json(tokens);                                         
        })
    }catch(err){
        res.status(403).json({error: err.message});
    }
}
function generateToken({id}){
    const accessToken =  jwt.sign({id}, process.env.ACCESS_TOKEN, {expiresIn:'30s'});
    const refreshToken =  jwt.sign({id}, process.env.REFRESH_TOKEN, {expiresIn:'5m'});
    return {accessToken, refreshToken};
  }

  export {newlogin,newRefToken};
