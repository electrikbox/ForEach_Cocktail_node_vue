import { Router } from "express";
import ingredientController from "../controllers/ingredientController.js";


// Create a new router
const ingredientRouter = Router();

// Routes
ingredientRouter.post("/create", ingredientController.createIngredient);
ingredientRouter.get("/all", ingredientController.getAllIngredient);
ingredientRouter.get("/get/:id", ingredientController.getIngredient);
ingredientRouter.put("/update/:id", ingredientController.updateIngredient);
ingredientRouter.delete("/delete/:id", ingredientController.deleteIngredient);

export default ingredientRouter;
