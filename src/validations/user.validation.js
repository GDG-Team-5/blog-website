import Joi from "joi";

const updateUserSchema = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
  }),
};
export default { updateUserSchema };
