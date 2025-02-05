import { Router } from "express";
import categoryCotroller from "../controllers/categoryController.js";


// Create a new router
const categoriesRouter = Router();

// Routes
categoriesRouter.post("/create", categoryCotroller.createCategory);
categoriesRouter.get("/all", categoryCotroller.getAllCategories);
categoriesRouter.get("/get/:id", categoryCotroller.getCategory);
categoriesRouter.put("/update/:id", categoryCotroller.updateCategory);
categoriesRouter.delete("/delete/:id", categoryCotroller.deleteCategory);

export default categoriesRouter;
