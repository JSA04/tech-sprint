const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { checkAuth } = require("../middlewares/authMiddleware");

// Middleware de autenticação para todas as rotas de ideias
router.get("/", checkAuth, ideaController.findAllIdeas);
router.get("/new", checkAuth, ideaController.createIdeaForm);
router.post("/", checkAuth, ideaController.saveNewIdea);
// Fluxo de informações e ideias do usuário
router.get("/user", checkAuth, ideaController.findIdeasByUser);
// Coloque a rota de editar antes da rota de buscar por id para evitar captura por ":id"
router.get("/:id/edit", checkAuth, ideaController.editIdeaForm);
router.get("/:id", checkAuth, ideaController.findIdeaById);
// Fluxo ao estilo User: apenas POST para mudanças de estado
router.post("/:id/update", checkAuth, ideaController.updateIdea);
router.post("/:id/delete", checkAuth, ideaController.deleteIdea);

module.exports = router;
