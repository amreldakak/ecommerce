import { handleError } from "../middleware/HandleAsyncError.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/appError.js";
import cartModel from "../../../DB/Model/cart.model.js";
import ProductModel from "../../../DB/Model/product.model.js";
import couponModel from "../../../DB/Model/coupon.model.js";

function calcPrice(cart){
    let totalPrice= 0;
    cart.cartItems.forEach((ele)=> {
        totalPrice += ele.price * ele.quantity;
    })

    cart.totalPrice=totalPrice;
}

const addCart = handleError( async (req,res,next)=>{

    let product = await ProductModel.findById(req.body.product);
    if(!product) return next(new AppError("Not Found",404));

    if(req.body.quantity > product.quantity) return next(new AppError("Sold Out",401));

    req.body.price=product.price;
    let isCartExist = await cartModel.findOne({user:req.user._id});
    if(!isCartExist){
        let cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        });

        calcPrice(cart);
        await cart.save();
        res.json({message:"created",cart})
    }

    let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product);
    if(item){
        if(item.quantity >= product.quantity) return next(new AppError("Sold Out",401));
        item.quantity += 1;
    }else{
        isCartExist.cartItems.push(req.body)
    }
    
    calcPrice(isCartExist);
    if(isCartExist.discount) isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - isCartExist.discount;
    await isCartExist.save();

    res.json({message:"created",isCartExist})
});

const getCart = handleError(async (req,res,next)=>{
    let cart = await cartModel.findOne({user:req.user._id});
    res.json({message:"done", cart})
});

const removeCartItem = handleError(async(req,res,next)=>{
    let cart = await cartModel.findOneAndUpdate({user:req.user._id},{$pull: {cartItems:{_id:req.params.id}}},{new:true});
    let find = await cartModel.findOne({user:req.user._id})
    calcPrice(find);
    res.json({message:"deleted", find});
});

const updateCart = handleError( async (req,res,next)=>{

    let product = await ProductModel.findById(req.body.product);
    if(!product) return next(new AppError("Not Found",404));
    req.body.price=product.price;
    let isCartExist = await cartModel.findOne({user:req.user._id});
    

    let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product);
    !item && next(new AppError("Not Found",404));
    if(item){
        item.quantity = req.body.quantity;
    }
    
    calcPrice(isCartExist);
    await isCartExist.save();

    res.json({message:"created",isCartExist})
});

const applyCoupon = handleError( async (req,res,next)=>{
    let code = await couponModel.findOne({code:req.params.code});
    let cart = await cartModel.findOne({user:req.user._id});
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice*code.discount)/100;
    cart.discount = code.discount;
    await cart.save();
    res.json({message:"Discount Applied Successfully",cart});
})

const deleteCart = deleteOne(cartModel);


export {
    addCart,
    getCart,
    removeCartItem,
    updateCart,
    applyCoupon,
    deleteCart
}