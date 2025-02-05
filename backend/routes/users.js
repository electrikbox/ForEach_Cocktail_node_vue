import { Router } from "express";
import userController from "../controllers/userController.js";


// Create a new router
const userRouter = Router();

// Routes
userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.userLogin);
userRouter.get("/all", userController.getAllUsers);
userRouter.get("/get/:id", userController.getUser);
userRouter.put("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);

export default userRouter;
