import { Router } from "express";
import authRoutes from "./Auth.router";
import categoryRoutes from "./Category.router";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/category", categoryRoutes);


export default rootRouter;
