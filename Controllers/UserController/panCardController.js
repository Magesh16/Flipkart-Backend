import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import client from '../../Utils/database.js';

cloudinary.config({
    cloud_name: "dh5qz4hsq",
    api_key: "687518918886193",
    api_secret: "NLaaTmXCasa22Vrm2FM4DQZW694"
  });
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, './uploads');
    },
    filename : (req,file,cb)=>{
        cb(null, new Date().now()+ '-'+ file.originalname)
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
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: fileFilter
})

let uploads = (file,folder)=>{
    return new Promise((resolve,rej)=>{
        cloudinary.uploader.upload(file.tempFilePath, (result)=>{
            resolve({
                url : result.url,
                id : result.public_id
            })
        },{
            resource_type :"auto",
            folder : folder
        })
    })
}
const isValidPanNumber = (pan_number)=>{
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan_number);
}

  let pan_info = async (req, res) => {
    const { pan_number, full_name } = req.body;
    if(!pan_number) res.status(200).send("Enter the PAN number");
    if(!isValidPanNumber(pan_number))  return res.status(200).send("Enter Valid PAN number");
    const file = req.body.image_url;               
    try {
        console.log(file);
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'image',                                                                                                                                         
      });
      try {
        await client.query('BEGIN');
        const publicUrl = result.secure_url;
        const {userId}  = req.user;
        const check = await client.query('select id from panCard where user_id = $1', [userId]);
        if(check.rows.length>0){
            return res.status(400).send({message: 'Pan Card already exists'});
        }else{
         await client.query(
          'INSERT INTO panCard (pan_number, full_name, image_url, user_id) VALUES ($1, $2, $3, $4)',
          [pan_number, full_name, publicUrl, userId]
        );
        await client.query('COMMIT');
        res.status(200).json({ message: "Image uploaded", status: true});
        }
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      }
                                                                                                                                                                                                                     
    } catch (e) {
      console.error(e);
      res.status(500).send('Error uploading file');
    }
  };

  export {upload, uploads, pan_info}