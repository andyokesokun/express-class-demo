import { Router} from "express";
import UserController from "../../controllers/user";
import { validateUserCreation } from "../../middlewares/validations/user.validation";
import { authenticator } from "../../middlewares/authenticator";

const userRouter = Router();
const { getUsers, createUser, getById, updateUser, setUserPassword, deleteUser, login } =
  UserController;

userRouter
  .get("/", authenticator, getUsers)
  .post("/",
     authenticator,
     validateUserCreation, 
     createUser)
  .put('/update-password/:id', setUserPassword)
  .get("/:id", getById)
  .put("/:id", updateUser)
  .post("/login", login);

userRouter.delete("/:id", deleteUser);
// userRouter.post("/login", login)
export default userRouter;
