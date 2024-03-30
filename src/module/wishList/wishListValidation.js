import Joi from "joi";

export const addToWishlistVal = Joi.object({
    product: Joi.string().hex().length(24).required(),
})

export const getByIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
    
})

export const updateWishlistVal = Joi.object({
    product: Joi.string().hex().length(24).required(),
})