import { Router } from "express";
import etapesPreparationController from "../controllers/etapesPreparationController.js";


// Create a new router
const etapesPreparationRouter = Router();

// Routes
etapesPreparationRouter.post("/create", etapesPreparationController.createEtapesPreparation);
etapesPreparationRouter.get("/all", etapesPreparationController.getAllEtapesPreparations);
etapesPreparationRouter.get("/get/:id", etapesPreparationController.getEtapesPreparation);
etapesPreparationRouter.put("/update/:id", etapesPreparationController.updateEtapesPreparation);
etapesPreparationRouter.delete("/delete/:id", etapesPreparationController.deleteEtapesPreparation);

export default etapesPreparationRouter;
