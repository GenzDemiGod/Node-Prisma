import { Router } from "express";
import { zodSchemaValidator } from "../middlewares/zodMiddleware";
import { addCategorySchema } from "../schema/categorySchema";
import { addCategory } from "../controllers/category";
import { verifyToken } from "../middlewares/authMiddlware";
const categoryRoutes: Router = Router();

categoryRoutes.post(
  "/addCategory",
  verifyToken,
  zodSchemaValidator(addCategorySchema, { body: true }),
  addCategory
);

export default categoryRoutes;
