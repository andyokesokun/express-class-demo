import Joi from "joi";
import User from "../../models/user";

export const userSchema = Joi.object<User>({
  name: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string(),
});
