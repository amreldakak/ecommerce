import Joi from "joi";

export const createCouponVal = Joi.object({
    code:Joi.string().max(12).required(),
    expires:Joi.string().required(),
    discount:Joi.number().required(),

});

export const updateCouponVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    expires:Joi.string().required(),
    discount:Joi.number().required(),

});

export const getCouponVal = Joi.object({
    id: Joi.string().hex().length(24).required(),

});