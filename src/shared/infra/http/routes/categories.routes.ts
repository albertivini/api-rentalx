import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/ListCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/imports",
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };