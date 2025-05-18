import { Router} from "express";
import UserController from "../../controllers/user";

const userRouter = Router();
const { getUsers, createUser, getById, updateUser, deleteUser } =
  UserController;

userRouter
  .get("/", getUsers)
  .post("/", createUser)
  .get("/:id", getById)
  .put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
