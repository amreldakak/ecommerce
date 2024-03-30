import { AppError } from "../../../utils/appError.js"

export function handleError(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>  next(new AppError(err,401)) )
    }
       
}