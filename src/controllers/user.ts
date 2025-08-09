import { Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { ensureUserCrendentialIsValid, generateToken } from "../utils/helpers";
import logger from "../utils/logger";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  await ensureUserCrendentialIsValid(username, password, res);
  
  const user = await User.getByEmail(username);
  const token = generateToken(user,password, res);

  const response = {
    message: "login successful",
    token,
  };
  res.status(200).json(response);
});


const getUsers = async (req: Request, res: Response) => {
  logger.info("getUsers: Entered getUsers method");
  const users = await User.getUsers();
  logger.info("getUser: Fetched users successfully");
  res.send({ message: "Get all users", users }).status(200);
};

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await User.createUser({ name, email });

  const data = {
    message: "User created",
    user,
  };
  res.status(201).json(data);
});

const setUserPassword = asyncHandler(async (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.params;

  const user = await User.getById(id);
  if (!user) {
    res.status(404).json({ message: "User doesn't not exist" });
  }

  const salt = await bcrypt.genSalt(5);
  const encryptedPassword = await bcrypt.hash(password, salt);
  await User.updatePassword(id, encryptedPassword);

  const data = {
    message: "User password updated",
    user,
  };
  res.status(200).json(data);
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.getById(id);

  const data = {
    message: "Get user by id",
    user,
  };

  res.status(200).json(data);
});

const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const data = {
    message: "User updated",
    user: {
      id,
      name,
      email,
    },
  };
  res.status(200).json(data);
};

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = {
    message: "User deleted",
    user: {
      id,
    },
  };
  res.status(200).json(data);
};

const getRenderedUser = (req: Request, res: Response) => {
  const { getUsers } = User; //model
  res.render("user", { title: "Get Users", users: getUsers() });
};

const UserController = {
  getUsers,
  createUser,
  getById,
  updateUser,
  deleteUser,
  getRenderedUser,
  setUserPassword,
  login,
};

export default UserController;
