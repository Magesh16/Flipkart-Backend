import jwt from 'jsonwebtoken';
let refToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(token){
      jwt.verify(token, process.env.ACCESS_TOKEN ,(err,decoded)=>{
          if(err) res.status(401).json({status:false , message: 'Invalid token.' });
          else{
            req.user = decoded;
            next();
          }
      })
    }  
    else{
      res.status(401).json({ status:false ,message: 'Missing token.' })
    }
  }

  export default refToken;