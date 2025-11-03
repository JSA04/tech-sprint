const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");

// Definindo as rotas
router.get("/", ideaController.findAllIdeas);
router.get("/new", ideaController.createIdeaForm);
router.post("/", ideaController.saveNewIdea);
router.get("/:id", ideaController.findIdeaById);
router.get("/:id/edit", ideaController.editIdeaForm);
router.put("/:id", ideaController.updateIdea);
router.delete("/:id", ideaController.deleteIdea);

module.exports = router;
