import express from 'express';
import refToken from '../../middlewares/authorization.js';
import {getUser, register, login, verifyOTPSMS} from '../../controllers/userController/controllers.js';
import {getProfile,updateProfile1, updateProfileEmail, updateProfileMobileNum, verifyOtp, verifyOTPEMAILSMS,verifyOldNewMobileOTP} from '../../controllers/userController/profileControllers.js'
import { deleteAddress,getAddressById, getAddress, postAddress, updateAddress } from '../../controllers/userController/addressController.js';
import { pan_info } from '../../controllers/userController/panCardController.js';
import  {upload} from '../../utils/cloudinary.js'
let routes = express.Router();

 
// To get all the user
routes.get('/getUser',refToken, getUser);
routes.post('/register', register);
routes.post('/login',login);
routes.post('/verifyOTPSMS',verifyOTPSMS )

routes.get('/getProfile',refToken, getProfile);
routes.put('/updateProfile1',refToken,updateProfile1);
routes.put('/updateProfileEmail',refToken, updateProfileEmail);
routes.put('/updateProfileMobileNum', refToken, updateProfileMobileNum);
routes.post('/verifyOTP', verifyOtp);
routes.post('/verifyOTPEMAILSMS',refToken, verifyOTPEMAILSMS);
routes.post('/verifyOldNewMobileOTP',refToken,verifyOldNewMobileOTP);

routes.get('/getAddress',refToken, getAddress);
routes.get('/getAddress/:id',refToken,getAddressById );
routes.post('/postAddress',refToken, postAddress );
routes.put('/updateAddress/:id', refToken, updateAddress);
routes.delete('/deleteAddress/:id', refToken, deleteAddress);

routes.post('/pan_card', upload.single('image_url'), refToken, pan_info);

export default routes;