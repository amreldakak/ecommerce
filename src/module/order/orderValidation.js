import Joi from "joi";

export const OrderByIdVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

export const createOrderVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    shippingAddress: Joi.object({
        city: Joi.string().required(),
        street: Joi.string().required()
    })

});