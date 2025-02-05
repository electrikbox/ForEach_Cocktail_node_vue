import { Router } from "express";
import userController from "../controllers/userController.js";
import tokenAuth from "../middlewares/tokenAuth.js";


// Create a new router
const userRouter = Router();

// Routes
userRouter.post("/login", userController.userLogin);
userRouter.post("/create", userController.createUser);
userRouter.get("/all", tokenAuth, userController.getAllUsers);
userRouter.get("/get/:id", tokenAuth, userController.getUser);
userRouter.put("/update/:id", tokenAuth, userController.updateUser);
userRouter.delete("/delete/:id", tokenAuth, userController.deleteUser);

export default userRouter;
