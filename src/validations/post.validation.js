import Joi from "joi";
import { validateObjectId } from "./custom.validation.js";
const postCreateSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().uri().optional(),
  }),
};

const postUpdateSchema = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      content: Joi.string().optional(),
      category: Joi.string().optional(),
      image: Joi.string().uri().optional(),
    })
    .min(1),
};

const postDeleteSchema = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
};

export default { postCreateSchema, postUpdateSchema, postDeleteSchema };
