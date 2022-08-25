import { Router } from "express";
import { UserController } from "./controllers/user-controller";

const router = Router();

const userController = new UserController();
const teamController = new TeamController();

// User router
router.post("/user/register", userController.register);
router.post("/user/login", userController.Login);

export { router };