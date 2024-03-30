import Joi from "joi";

export const addUserVal = Joi.object({
    username:Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    number:Joi.string().required(),
    role:Joi.string().valid("User","Admin"),

});

export const getByIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});

export const updateUserVal = Joi.object({
    username:Joi.string().min(3).max(12),
    password:Joi.string(),
    number:Joi.string(),

});