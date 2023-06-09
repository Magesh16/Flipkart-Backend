import jwt from "jsonwebtoken";
let refToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err)
          res.status(401).json({ status: false, message: "Invalid token." });
        else {
          req.user = decoded;
          
          // req.user =req.user.id;
          // console.log(req.user);
          next();
        }
      });
    } else {
      res.status(401).json({ status: false, message: "Missing token." });
    }
  } catch (err) {
    res.status(403).json({ status: false, err: err.message });
  }
};

export default refToken;
