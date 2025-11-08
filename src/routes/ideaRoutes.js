const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { checkAuth } = require("../middlewares/authMiddleware");

/**
* Rotas de ideias
* TODAS AS ROTAS DE IDEIA SÃO AUTENTICADAS!
*/

// Visualização e formulários
router.get("/", checkAuth, ideaController.renderIdeas);
router.get("/new", checkAuth, ideaController.renderCreateIdea);
router.get("/:id/edit", checkAuth, ideaController.renderEditIdea);
router.get("/:id", checkAuth, ideaController.renderIdea);

// Ações: Criar, atualizar e remover
router.post("/", checkAuth, ideaController.createIdea);
router.post("/:id/update", checkAuth, ideaController.updateIdea);
router.post("/:id/delete", checkAuth, ideaController.deleteIdea);

module.exports = router;
