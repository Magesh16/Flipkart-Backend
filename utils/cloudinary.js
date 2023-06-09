import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, './images');
    },
    filename : (req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file,cb)=>{
    if(file.mimetype === 'image/jpeg' || 'image/png'){
        cb(null, true);
    }else{
        cb({message: 'Unsupported File Format'}, false);
    }
}
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter: fileFilter
})

export {cloudinary,storage, upload, fileFilter};