import { handleError } from "../middleware/HandleAsyncError.js";


export const deleteOne = (model) =>{
    return handleError( async(req,res)=>{
        let deleted = await model.findByIdAndDelete(req.params.id);
        deleted && res.json({message:"Done",deleted});
        !deleted && res.json({message:"Not Found"});
    })
}