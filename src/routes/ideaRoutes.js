const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { checkAuth } = require("../middlewares/authMiddleware");
const { body, param } = require("express-validator");
const { handleValidation } = require("./helpers/validationHelper");

/**
* Rotas de ideias
* TODAS AS ROTAS DE IDEIA SÃO AUTENTICADAS!
*/

// Visualização e formulários
router.get("/", checkAuth, ideaController.renderIdeas);
router.get("/new", checkAuth, ideaController.renderCreateIdea);
router.get("/user", checkAuth, ideaController.renderUserIdeas);
router.get(
  "/:id/edit",
  checkAuth,
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation("/ideas"),
  ideaController.renderEditIdea,
);
router.get(
  "/:id",
  checkAuth,
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation("/ideas"),
  ideaController.renderIdea,
);

// Ações: Criar, atualizar e remover
router.post(
    "/", 
    checkAuth, 
    [
        body("title").trim().isLength({ min: 3, max: 30 }).withMessage("Título deve ter entre 3 e 30 caracteres"),
        body("description").trim().notEmpty().withMessage("Descrição não pode estar vazia"),
        body("categoryId").isInt({ min: 1 }).withMessage("Categoria inválida"),
    ],
    handleValidation("/ideas/new"),
    ideaController.createIdea,
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
  ideaController.updateIdea,
);
router.post(
  "/:id/delete",
  checkAuth,
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation("/ideas"),
  ideaController.deleteIdea,
);

module.exports = router;
