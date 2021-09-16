import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
    "/",
    ensureAuthenticated,
    createSpecificationController.handle
);

export { specificationRoutes };
