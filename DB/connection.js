import mongoose from "mongoose";

const conn = mongoose.connect(process.env.ONLINE_DB).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(`DataBase Error ${err}`);
});

export default conn;