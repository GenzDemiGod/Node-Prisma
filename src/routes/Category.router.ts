import { Router } from "express";
import { zodSchemaValidator } from "../middlewares/zodMiddleware";
import { addCategorySchema, deleteCategorySchema, editCategorySchema, listCategorySchema } from "../schema/categorySchema";
import { addCategory, deleteCategory, editCategory, listCategory } from "../controllers/category";
import { verifyToken } from "../middlewares/authMiddlware";
const categoryRoutes: Router = Router();

categoryRoutes.post(
  "/addCategory",
  verifyToken,
  zodSchemaValidator(addCategorySchema, { body: true }),
  addCategory
);
categoryRoutes.get(
  "/listCategory",
  verifyToken,
  zodSchemaValidator(listCategorySchema, { query: true }),
  listCategory
);
categoryRoutes.put(
  "/editCategory",
  verifyToken,
  zodSchemaValidator(editCategorySchema, { body: true }),
  editCategory
);
categoryRoutes.delete(
  "/deleteCategory",
  verifyToken,
  zodSchemaValidator(deleteCategorySchema, { query: true }),
  deleteCategory
);
export default categoryRoutes;
