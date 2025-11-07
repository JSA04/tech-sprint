const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { checkAuth } = require("../middlewares/authMiddleware");
const { body, param } = require("express-validator");
const { handleValidation } = require("./helpers/validationHelper");

// Middleware de autenticação para todas as rotas de ideias
router.get("/", checkAuth, ideaController.findAllIdeas);
router.get("/new", checkAuth, ideaController.createIdeaForm);
router.post(
  "/",
  checkAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Título deve ter entre 3 e 30 caracteres"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Descrição não pode estar vazia"),
    body("categoryId").isInt({ min: 1 }).withMessage("Categoria inválida"),
  ],
  handleValidation("/ideas/new"),
  ideaController.saveNewIdea
);

router.get(
  "/:id/edit",
  checkAuth,
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation("/ideas"),
  ideaController.editIdeaForm
);
router.get(
  "/:id",
  checkAuth,
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation("/ideas"),
  ideaController.findIdeaById
);

router.post(
  "/:id/update",
  checkAuth,
  [
    param("id").isInt({ min: 1 }).withMessage("ID inválido"),
    body("title")
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Título deve ter entre 3 e 30 caracteres"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Descrição não pode estar vazia"),
    body("categoryId")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Categoria inválida"),
  ],
  handleValidation((req) => `/ideas/${req.params.id}/edit`),
  ideaController.updateIdea
);
router.post(
  "/:id/delete",
  checkAuth,
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation("/ideas"),
  ideaController.deleteIdea
);

module.exports = router;
