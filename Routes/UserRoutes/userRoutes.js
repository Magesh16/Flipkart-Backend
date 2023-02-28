import express from 'express';
import refToken from '../../middlewares/authorization.js';
// import {newlogin, newRefToken} from '../../Controllers/UserController/loginController.js'
import {getUser, register, login, verifyOTPSMS} from '../../Controllers/UserController/controllers.js';
import {updateProfile1, updateProfileEmail, verifyOtp, verifyOTPEMAILSMS} from '../../Controllers/UserController/profileControllers.js'
let routes = express.Router();
// authenticateToken, authenticateRefreshToken
 
// To get all the user
routes.get('/getUser',refToken, getUser);
// routes.get('/refresh_token', newRefToken);

routes.post('/register', register);
routes.post('/login',login);
// routes.get('/token', authenticateToken,authenticateRefreshToken);
routes.post('/verifyOTPSMS',verifyOTPSMS )

routes.put('/updateProfile1',refToken,updateProfile1);
routes.put('/updateProfileEmail',refToken, updateProfileEmail);
routes.post('/verifyOTP', verifyOtp);
routes.post('/verifyOTPEMAILSMS',refToken, verifyOTPEMAILSMS);
// routes.get('/token', refToken);
export default routes;