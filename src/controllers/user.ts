import { Request, Response } from "express";
import User from "../models/user";

const getUsers = (req: Request, res: Response) => {
  const { getUsers } = User;
  res.send({ message: "Get all users", users: getUsers() }).status(200);
};

const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const data = {
    message: "User created",
    user: {
      name,
      email,
    },
  };

  res.status(201).json(data);
};

const getById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = {
    message: "Get user by id",
    user: {
      id,
    },
  };

  res.status(200).json(data);
};

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

const getRenderedUser = (req: Request,res: Response)=>{
    const {getUsers} = User; //model
    res.render('user',{title:"Get Users", users: getUsers()} );
}

const UserController = {
  getUsers,
  createUser,
  getById,
  updateUser,
  deleteUser,
  getRenderedUser
};

export default UserController;
