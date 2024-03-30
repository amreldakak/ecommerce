import Joi from "joi";

export const createCouponVal = Joi.object({
    code:Joi.string().max(20).required().trim(),
    expires:Joi.date().required(),
    discount:Joi.number().required(),

});

export const updateCouponVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    code:Joi.string().max(20).trim(),
    expires:Joi.date(),
    discount:Joi.number(),

});

export const getCouponVal = Joi.object({
    id: Joi.string().hex().length(24).required(),

});