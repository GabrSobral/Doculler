import { Router } from "express";
import { UserController } from "./application/controllers/user-controller";

const router = Router();

const userController = new UserController();

// User router
router.post("/user/register", userController.register);
router.post("/user/login", userController.Login);

export { router };