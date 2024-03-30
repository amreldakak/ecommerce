import categoryRoute from "./Categories/categoryRoutes.js";
import subCategoryRoute from "./SubCategories/subCategoryRoutes.js";
import authRoute from "./auth/auth.routes.js";
import brandRoute from "./brand/brandRoutes.js";
import cartRoute from "./cart/cartRoutes.js";
import couponRoute from "./coupon/couponRoutes.js";
import orderRoute from "./order/orderRoutes.js";
import productRoute from "./product/productRoutes.js";
import reviewRoute from "./review/reviewRoutes.js";
import userRoute from "./users/userRoutes.js";
import wishListRoute from "./wishList/wishListRoutes.js";


export const allRoutes = (app)=>{
    app.use("/api/v1/category",categoryRoute);
    app.use("/api/v1/subcategory",subCategoryRoute);
    app.use("/api/v1/brand",brandRoute);
    app.use("/api/v1/product",productRoute);
    app.use("/api/v1/user",userRoute);
    app.use("/api/v1/review",reviewRoute);
    app.use("/api/v1/app",authRoute);
    app.use("/api/v1/wishList",wishListRoute);
    app.use("/api/v1/coupon",couponRoute);
    app.use("/api/v1/cart",cartRoute);
    app.use("/api/v1/order",orderRoute)
}