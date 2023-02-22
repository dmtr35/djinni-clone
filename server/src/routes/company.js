import { Router } from "express";
import CompanyController from "../controllers/company.js";
import AuthMiddleware from "../middlewares/auth.js";
import { Roles } from "../common/enums.js";
import RolesGuard from "../middlewares/roles.js";
import { uploadWithSaving } from "../services/multer.js";

const companyRouter = new Router();


/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get a company by id
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: The company with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /company/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The company ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CompanyUpdate'
 *     responses:
 *       200:
 *         description: The updated company info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */




companyRouter.get("/:id", CompanyController.getById);

companyRouter.put(
  "/:id",
  AuthMiddleware({ requiredLogin: true }),
  uploadWithSaving.single("avatar"),
  RolesGuard([Roles.Recruter]),
  CompanyController.update
);

export default companyRouter;
