import {Request, Response, NextFunction } from "express";
import User from "../../models/user";
import { userSchema } from "../../validators/schemas/user.schema";

const {doesUserExist} = User;
const validateUserCreation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;
//   const {error} =  userSchema.validate(req.body);
//   if(error){
//       res.status(400).json({ mesage: error.details[0].message });
//   }

  await userSchema.validateAsync(req.body);

//   if (!name) {
//      res.status(400).json({ message: "Name is required" });
//   }
  
//   if (!email) {
//      res.status(400).json({ message: "Email is required" });
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailRegex.test(email)) {
//      res.status(400).json({ message: "Invalid email format" });
//   }

  const userExists = await doesUserExist(email);
  if (userExists) {
     res.status(400).json({ message: "Email already in use" });
  }

  next();
};

export { validateUserCreation };
