import Joi from "joi";

export const addUserVal = Joi.object({
    username:Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    number:Joi.string().required(),
    role:Joi.string().valid("User","Admin"),

});

