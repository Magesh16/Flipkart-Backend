import express from 'express';
import refToken from '../../middlewares/authorization.js';
import {getUser, register, login, verifyOTPSMS} from '../../Controllers/UserController/controllers.js';
import {updateProfile1, updateProfileEmail, updateProfileMobileNum, verifyOtp, verifyOTPEMAILSMS,verifyOldNewMobileOTP} from '../../Controllers/UserController/profileControllers.js'
import { deleteAddress, getAddress, postAddress, updateAddress } from '../../Controllers/UserController/addressController.js';
let routes = express.Router();

 
// To get all the user
routes.get('/getUser',refToken, getUser);
routes.post('/register', register);
routes.post('/login',login);
routes.post('/verifyOTPSMS',verifyOTPSMS )

routes.put('/updateProfile1',refToken,updateProfile1);
routes.put('/updateProfileEmail',refToken, updateProfileEmail);
routes.post('/updateProfileMobileNum', refToken, updateProfileMobileNum);
routes.post('/verifyOTP', verifyOtp);
routes.post('/verifyOTPEMAILSMS',refToken, verifyOTPEMAILSMS);
routes.post('/verifyOldNewMobileOTP',refToken,verifyOldNewMobileOTP);

routes.get('/getAddress',refToken, getAddress);
routes.post('/postAddress',refToken, postAddress );
routes.put('/updateAddress/:id', refToken, updateAddress);
routes.delete('/deleteAddress/:id', refToken, deleteAddress);

export default routes;