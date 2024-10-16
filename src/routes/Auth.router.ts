import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { zodSchemaValidator } from "../middlewares/zodMiddleware";
import { loginSchema, signupSchema } from "../schema/authSchema";
const authRoutes: Router = Router();

authRoutes.post("/signup", zodSchemaValidator(signupSchema, { body: true }), signup);
authRoutes.post("/login", zodSchemaValidator(loginSchema, { body: true }), login);

export default authRoutes;
