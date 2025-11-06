const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { checkAuth } = require("../middlewares/authMiddleware");

// Middleware de autenticação para todas as rotas de ideias
router.use(checkAuth);
router.get("/", ideaController.findAllIdeas);
router.get("/new", ideaController.createIdeaForm);
router.post("/", ideaController.saveNewIdea);

router.get("/:id/edit", ideaController.editIdeaForm);
router.get("/:id", ideaController.findIdeaById);

router.post("/:id/update", ideaController.updateIdea);
router.post("/:id/delete", ideaController.deleteIdea);

module.exports = router;
