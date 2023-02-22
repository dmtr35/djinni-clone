import { Router } from "express";
import VacancyController from "../controllers/vacancy.js";
import AuthMiddleware from "../middlewares/auth.js";
import { Roles } from "../common/enums.js";
import RolesGuard from "../middlewares/roles.js";
import { uploadWithoutSaving } from "../services/multer.js";

const vacancyRouter = new Router();



/**
 * @swagger
 * /vacancy:
 *   post:
 *     summary: Create a new vacancy
 *     tags: [Vacancy]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vacancy'
 *     responses:
 *       200:
 *         description: The created vacancy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *
 */

/**
 * @swagger
 *   /vacancy/filter:
 *     post:
 *       summary: Get vacancies by filter
 *       tags: [Vacancy]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VacancyFilter'
 *       responses:
 *         200:
 *           description: The list of vacancies
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Vacancy'
 *         400:
 *           $ref: '#/components/responses/BadRequestError'
 *
 */

/**
 * @swagger
 *   /vacancy/{vacancyId}/apply:
 *     post:
 *       summary: Apply for a vacancy
 *       tags: [Vacancy]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/ApplyForVacancyRequest'
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Flag indicating if the application was successful or not
 *                   message:
 *                     type: string
 *                     description: A message explaining the result of the application
 *         400:
 *           $ref: '#/components/responses/BadRequestError'
 *         401:
 *           $ref: '#/components/responses/UnauthorizedError'
 *         403:
 *           $ref: '#/components/responses/ForbiddenError'
 */
/**

/**
 * @swagger
 * /vacancy/byUser:
 *   get:
 *     summary: Get all vacancies created by the currently authenticated recruiter
 *     tags: [Vacancy]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of vacancies created by the currently authenticated recruiter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacancy'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @swagger
 * /vacancy/{id}:
 *   get:
 *     summary: Get a vacancy by ID
 *     tags: [Vacancy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vacancy to get
 *     responses:
 *       200:
 *         description: The requested vacancy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /vacancy/{id}:
 *   put:
 *     summary: Update a vacancy by ID
 *     tags: [Vacancy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vacancy to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vacancy'
 *     responses:
 *       200:
 *         description: The updated vacancy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /vacancy/search/{searchTerm}:
 *   get:
 *     summary: Search vacancies by keyword.
 *     description: Returns a list of vacancies that match the provided search term. Searches the vacancy name, short description, and detailed description fields using a case-insensitive regular expression.
 *     tags: [Vacancy]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         description: The keyword to search for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of vacancies that match the search term.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacancy'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */




vacancyRouter.post(
  "/",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.create
);

vacancyRouter.post(
  "/filter",
  AuthMiddleware({ requiredLogin: false }),
  VacancyController.getByFitler
);

vacancyRouter.post(
  "/:vacancyId/apply",
  AuthMiddleware({ requiredLogin: true }),
  uploadWithoutSaving.single("CV"),
  RolesGuard([Roles.Candidate]),
  VacancyController.apply
);

vacancyRouter.get(
  "/byUser",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.getByUser
);

vacancyRouter.get(
  "/:id",
  AuthMiddleware({ requiredLogin: false }),
  VacancyController.getById
);

vacancyRouter.put(
  "/:id",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.update
);

vacancyRouter.get(
  "/search/:searchTerm",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.searchByKeyword
);

export default vacancyRouter;
