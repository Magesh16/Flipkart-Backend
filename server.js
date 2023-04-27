import express from 'express';
import client from "./Utils/database.js";
import userRoutes from './Routes/UserRoutes/userRoutes.js'
import productRoutes from './Routes/ProductRoutes/productRoutes.js'
import giftCardRoutes from './Routes/GiftCardRoutes/giftcardRoutes.js'
import fileupload  from 'express-fileupload'; 
import cors from 'cors';

let app = express();
app.use(cors({
    origin:'http://localhost:3000'
}))


client.connect((err)=>{
    if(err){
        return console.error('Error acquiring client', err.stack);
    }else{
        console.log('Connected to database');
    }
});

app.use(express.json());
app.use(fileupload({useTempFiles: true})) ; 

  
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/',giftCardRoutes);


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})