import { Router } from "express";
import AuthController from "../controllers/auth.js";
import { uploadWithSaving } from "../services/multer.js";

const authRouter = new Router();



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 * 
 * /auth/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 * 
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */




authRouter.post(
  "/registration",
  uploadWithSaving.single("avatar"),
  AuthController.registation
);

authRouter.post("/login", AuthController.login);

export default authRouter;
