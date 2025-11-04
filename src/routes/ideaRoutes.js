const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { checkAuth } = require("../middlewares/authMiddleware");

// Middleware de autenticação para todas as rotas de ideias
router.use(checkAuth);
router.get("/", ideaController.findAllIdeas);
router.get("/new", ideaController.createIdeaForm);
router.post("/", ideaController.saveNewIdea);
// Coloque a rota de editar antes da rota de buscar por id para evitar captura por ":id"
router.get("/:id/edit", ideaController.editIdeaForm);
router.get("/:id", ideaController.findIdeaById);
// Fluxo ao estilo User: apenas POST para mudanças de estado
router.post("/:id/update", ideaController.updateIdea);
router.post("/:id/delete", ideaController.deleteIdea);

module.exports = router;
