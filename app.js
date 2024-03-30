import 'dotenv/config'
import express from "express";
import conn from "./DB/connection.js";
import { allRoutes } from './src/module/routes.js';
import { AppError } from './utils/appError.js';
import cors from "cors";
import { createOnlineOrder } from './src/module/order/orderController.js';

conn;
//const upload = multer({dest:'uploads'});
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"))
app.post("/webhook",express.raw({type: 'application/json'}),createOnlineOrder)

allRoutes(app);


app.use("*",(req,res,next)=>{
  next(new AppError("URL not found", 404))
})

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({message: err.message, stack:err.stack})
  })


app.listen(process.env.PORT || 3000,()=>{
    console.log("hello");
});