import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleError } from '../middleware/HandleAsyncError.js';
import userModel from '../../../DB/Model/user.model.js';
import { AppError } from '../../../utils/appError.js';

const signUp = handleError( async (req,res,next)=>{
    let isFound = await userModel.findOne({email:req.body.email});
    if (isFound) return next(new AppError("Already exist", 409));
    let user = new userModel(req.body);
    await user.save();
    res.json({message:"added",user}) 
});

const signIn = handleError(async (req,res,next)=>{
    let {email,password}=req.body;
    let isFound = await userModel.findOne({email});
    const match = bcrypt.compareSync(password,isFound.password);

    if(isFound && match){
        let token = jwt.sign({name: isFound.name, userId: isFound._id, role: isFound.role},process.env.SECRET_KEY);
        res.json({message:"success",token})
    }
    next(new AppError("Incorrect Creditials",404))
});

const protectRoutes = handleError(async (req,res,next)=>{
    let {token} = req.headers;
    if(!token) return next(new AppError("Token not Found",401))
    let decoded =  jwt.verify(token,process.env.SECRET_KEY);
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("User not Found", 401));

    if(user.changePasswordAt){
    let changePasswordTime = parseInt(user.changePasswordAt.getTime()/1000);
    if(changePasswordTime>decoded.iat) return next(new AppError("Token invaild",401))
    }

    req.user=user;
    next()

});

const allowTo = (...roles)=>{
    return handleError(async(req,res,next)=>{
        console.log(req.user.role);
        if (!roles.includes(req.user.role))  
            return next(new AppError("Not authorized to get in",403));

        next()
    })
}

export {
    signUp,
    signIn,
    protectRoutes,
    allowTo
}