import passport from "passport";
import { Router } from "express";
import UserController from "../../controllers/user";

const authRoute = Router();
const { login } = UserController;

authRoute.post("/login", login);

authRoute.get(
  "/:provider",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/:provider/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = (req as any).user;
    console.log(user);
    res.send(`Hello ${user.displayName}`);
  }
);

export default authRoute;
