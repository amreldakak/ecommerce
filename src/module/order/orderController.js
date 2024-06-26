import { handleError } from "../middleware/HandleAsyncError.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/appError.js";
import orderModel from "../../../DB/Model/order.model.js";
import cartModel from "../../../DB/Model/cart.model.js";
import ProductModel from "../../../DB/Model/product.model.js";
import Stripe from 'stripe';
import userModel from "../../../DB/Model/user.model.js";
const stripe = new Stripe(process.env.STRIPE_KEY);

const createOrder = handleError(async (req, res, next) => {
    // 1- cart ..... req.params.id
    let cart = await cartModel.findById(req.params.id);
    if(!cart) return next(new AppError("Cart not Found",400));
    //2- totalprice
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    //3-create order
    let order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice: totalOrderPrice,
        shippingAddress: req.body.shippingAddress,

    });
    await order.save();
    //4-update sold & quantity
    if (order) {
        let options = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }));

        await ProductModel.bulkWrite(options);
        
    } else {
        return next(AppError("Error Occurs", 409));
    }
    //5-remove cart

    await cartModel.findByIdAndDelete(cart._id);

    res.json({ message: "Done", order });
});

const getMyOrder = handleError(async (req, res, next) => {

    let order = await orderModel.findOne({ user: req.user._id }).populate("cartItems.product");
    if (!order) return next(AppError("Not Found", 401));
    res.json({ message: "Order", order });
});

const getAllOrder = handleError(async (req, res, next) => {

    let apiFeature = new ApiFeature(orderModel.find(),req.query).pagination().sort().search().fields()
    let order = await apiFeature.mongooseQuery;
    //let order = await orderModel.find({ user: req.user._id });
    if (!order) return next(AppError("Not Order Found", 401));
    res.json({ message: "Orders", page:apiFeature.page,order });
});

const onlinePayment = handleError(async (req, res, next) => {

    // 1- cart ..... req.params.id
    let cart = await cartModel.findById(req.params.id);
    if(!cart) return next(new AppError("Cart not Found",404));
    //2- totalprice
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "EGP",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.username,
                    },
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: "https://route-comm.netlify.app/#/",
        cancel_url: "https://route-comm.netlify.app/#/cart",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress,

    });

    res.json({ message: "Done", session });

});

const createOnlineOrder = handleError(async (req, res) => {
  const sig = req.headers['stripe-signature'].toString();

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, "whsec_kNaKNDqH5Q2UsO3gs4yR9XlC3ZFzdQgv");
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if(event.type == "checkout.session.completed"){
    const checkoutSessionCompleted = event.data.object;
    //create Order

    let cart = await cartModel.findById(checkoutSessionCompleted.client_reference_id);
    if(!cart) return next(new AppError("Cart not Found",400));

    let user = await userModel.findOne({email:checkoutSessionCompleted.customer_email});
    if(!user) return next(new AppError("User not Found",400));

    let order = new orderModel({
        user: user._id,
        cartItems: cart.cartItems,
        totalOrderPrice: checkoutSessionCompleted.amount_total/100,
        shippingAddress: checkoutSessionCompleted.metadata,
        isPaid:true,
        paymentMethod:"credit",
        paidAt:Date.now(),

    });
    await order.save();

        let options = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }));

        await ProductModel.bulkWrite(options);

        await cartModel.findByIdAndDelete(cart._id);
        
  }else{
    console.log(`Unhandled event type ${event.type}`);
  }

  
  // Return a 200 res to acknowledge receipt of the event
  res.json({message:"Done"});

});

export {
    createOrder,
    getMyOrder,
    getAllOrder,
    onlinePayment,
    createOnlineOrder
}