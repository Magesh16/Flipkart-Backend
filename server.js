import express from 'express';
import client from "./Utils/database.js";
import userRoutes from './Routes/UserRoutes/userRoutes.js'
import productRoutes from './Routes/ProductRoutes/productRoutes.js'
import fileupload  from 'express-fileupload'; 

let app = express();

client.connect((err)=>{
    if(err){
        return console.error('Error acquiring client', err.stack);
    }else{
        console.log('Connected to database');
    }
});
app.use(express.json());
app.use(fileupload({useTempFiles: true}))
app.use('/', userRoutes);
app.use('/', productRoutes);

// app.use(errorhandler)

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})