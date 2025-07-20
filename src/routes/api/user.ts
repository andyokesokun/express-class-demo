import { Router } from "express";
import UserController from "../../controllers/user";
import { validateUserCreation } from "../../middlewares/validations/user.validation";
import { authenticator } from "../../middlewares/authenticator";
import { roleAuthorizer } from "../../middlewares/roleAuthorizer";
import { ROLES } from "../../utils/enums";

const userRouter = Router();
const {
  getUsers,
  createUser,
  getById,
  updateUser,
  setUserPassword,
  deleteUser,
  login,
} = UserController;

const { SUPER_ADMIN, ADMIN } = ROLES;

userRouter
  .get("/", authenticator, roleAuthorizer([ADMIN, SUPER_ADMIN]), getUsers) // only admins and superAdmins
  .post("/", validateUserCreation, createUser)
  .put("/update-password/:id", authenticator,roleAuthorizer([SUPER_ADMIN]), setUserPassword) // only super admins
  .get("/:id", getById)
  .put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);
export default userRouter;
