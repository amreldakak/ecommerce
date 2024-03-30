import Joi from "joi";

export const createReviewVal = Joi.object({
    text:Joi.string().required(),
    product:Joi.string().hex().length(24).required(),
    rating:Joi.number().required()

});

export const byIdVal = Joi.object({
    id:Joi.string().hex().length(24).required(),
});

export const updateReviewVal = Joi.object({
    text:Joi.string().required(),
    id:Joi.string().hex().length(24).required(),
});