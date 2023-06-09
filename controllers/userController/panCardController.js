// import { v2 as cloudinary } from 'cloudinary';
import { cloudinary } from '../../utils/cloudinary.js';
import client from '../../utils/database.js';


const isValidPanNumber = (pan_number)=>{
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan_number);
}

  let getPanInfo = async(req,res)=>{
    try{
      const {userId} = req.user;
      console.log(userId);
    let result = await client.query(`select pan_number, full_name from pancard where user_id=$1`,[userId]);
    if(result.rows[0]== null){
      return res.status(400).send({message: [], status:false});
    }
    res.status(200).send({message:result.rows[0], status: true});
  }catch(err){
    res.status(403).send({message:err.message, status:false})
  }
  }

  let pan_info = async (req, res) => {
    const { pan_number, full_name } = req.body;
    if(!pan_number) return res.status(200).send("Enter the PAN number");
    if(!isValidPanNumber(pan_number)){
      res.status(403).send("Enter Valid PAN number");
      return;
    }
    // const file = req.body.image_url;               
    try {
      const {userId}  = req.user;
      const check = await client.query('select id from panCard where user_id = $1', [userId]);
        if(check.rows.length>0){                                                                                                                                        
            return res.status(400).send({message: 'Pan Card already exists'});
        }
      const result = await cloudinary.uploader.upload(req.file.path, {
        // resource_type: 'image',
        public_id: `${userId}_profile`                                                                                                                                         
      });
      try {
        await client.query('BEGIN');
        const publicUrl = result.secure_url;
         await client.query(
          'INSERT INTO panCard (pan_number, full_name, image_url, user_id) VALUES ($1, $2, $3, $4)',
          [pan_number, full_name, publicUrl, userId]
        );
        await client.query('COMMIT');
        res.status(200).json({ message: "Image uploaded", status: true});

      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      }


    } catch (e) {
      res.status(500).send('Error uploading file');
    }

  };
  export {pan_info, getPanInfo}

