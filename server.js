import express from 'express';
import cookieParser from 'cookie-parser';
import client from "./Utils/database.js";
import userRoutes from './Routes/UserRoutes/userRoutes.js'
let app = express();
// app.use(cors())

client.connect((err)=>{
    if(err){
        return console.error('Error acquiring client', err.stack);
    }else{
        console.log('Connected to database');
    }
});
app.use(express.json());
app.use('/', userRoutes);
// app.use(errorhandler)

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})