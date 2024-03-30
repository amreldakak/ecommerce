import Joi from "joi";

export const OrderByIdVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
});