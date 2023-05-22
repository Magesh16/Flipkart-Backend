import express from 'express';
import client from "./utils/database.js";
import userRoutes from './routes/userRoutes/userRoutes.js'
import productRoutes from './routes/productRoutes/productRoutes.js'
import giftCardRoutes from './routes/giftCardRoutes/giftcardRoutes.js'
import cors from 'cors';
import rateLimit from 'express-rate-limit'; 
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerJSDocs = YAML.load("./api.yaml");

let app = express();
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

// const limiter  = rateLimit({
//     windowMs: 15*60*1000,
//     max:100
// })

// app.use(limiter);

client.connect((err)=>{
    if(err){
        return console.error('Error acquiring client', err.stack);
    }else{
        console.log('Connected to database');
    }
});

app.use(express.json());
// app.use(fileupload({useTempFiles: true})) ; 

  
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/',giftCardRoutes);


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})