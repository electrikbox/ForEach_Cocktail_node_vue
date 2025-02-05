import { Router } from "express";
import cocktailController from "../controllers/cocktailController.js";
import ingredientRouter from "./ingredients.js";
import categoriesRouter from "./categories.js";
import etapesPreparationRouter from "./etapesPreparations.js";


// Create a new router
const cocktailRouter = Router();

// Routes
cocktailRouter.post("/create", cocktailController.createCocktail);
cocktailRouter.get("/all", cocktailController.getAllCocktails);
cocktailRouter.get("/get/:id", cocktailController.getCocktail);
cocktailRouter.put("/update/:id", cocktailController.updateCocktail);
cocktailRouter.delete("/delete/:id", cocktailController.deleteCocktail);

// Nested routes
cocktailRouter.use("/ingredients", ingredientRouter);
cocktailRouter.use("/categories", categoriesRouter);
cocktailRouter.use("/etapes_preparations", etapesPreparationRouter);

export default cocktailRouter;
