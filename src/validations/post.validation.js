import Joi from "joi";

const postCreateSchema = Joi.object({
  body: {
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().uri().optional(),
  },
});

const postUpdateSchema = Joi.object({
  params: {
    id: Joi.string().required(),
  },
  body: Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    category: Joi.string().optional(),
    image: Joi.string().uri().optional(),
  }).min(1),
});

const postDeleteSchema = Joi.object({
  params: {
    id: Joi.string().required(),
  },
});

export default { postCreateSchema, postUpdateSchema, postDeleteSchema };
