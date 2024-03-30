import Joi from "joi";

export const addToWishlistVal = Joi.object({
    street: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
})

export const getByIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
    
})

export const updateWishlistVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    street: Joi.string().trim(),
    city: Joi.string().trim(),
})