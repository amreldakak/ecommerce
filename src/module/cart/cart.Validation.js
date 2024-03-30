import Joi from "joi";

export const CartVal = Joi.object({
    product: Joi.string().hex().length(24).required()

});

export const ByIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()

});

export const updateCartVal = Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().required()
});

export const CouponVal = Joi.object({
    code: Joi.string().hex().length(24).required()

});