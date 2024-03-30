import Joi from "joi";

export const signUpVal = Joi.object({
    username:Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    phone:Joi.string().required(),
    role:Joi.string().valid("User"),

});

export const signInVal = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})


