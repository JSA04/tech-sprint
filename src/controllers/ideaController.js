const ideaService = require("../services/IdeaService");

module.exports = {
  async findAllIdeas(req, res) {
    try {
      const ideas = await ideaService.findAll();
      res.render("all", { ideas });
    } catch (error) {
      console.error(error);
      res.status(500).render("all", {
        ideas: [],
        error: error.message,
      });
    }
  },

  async findIdeaById(req, res) {
    const { id } = req.params;
    try {
      const idea = await ideaService.findById(id);
      res.render("idea", { idea });
    } catch (error) {
      console.error(error);
      res
        .status(error.message.includes("não encontrada") ? 404 : 500)
        .json({ error: error.message });
    }
  },

  async createIdeaForm(req, res) {
    try {
      const categories = await ideaService.getAllCategories();
      console.log("Categorias encontradas:", categories);
      res.render("create", { categories });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      res.status(500).render("create", {
        categories: [],
        error: error.message,
      });
    }
  },

  async saveNewIdea(req, res) {
    try {
      await ideaService.create(req.body);
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      const categories = await ideaService.getAllCategories();
      res.render("create", {
        categories,
        error: error.message,
        data: req.body,
      });
    }
  },

  async editIdeaForm(req, res) {
    const { id } = req.params;
    try {
      const idea = await ideaService.findById(id);
      const categories = await ideaService.getAllCategories();
      res.render("edit", { idea, categories });
    } catch (error) {
      console.error(error);
      res.status(500).redirect("/ideas");
    }
  },

  async updateIdea(req, res) {
    const { id } = req.params;
    try {
      await ideaService.update(id, req.body);
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      res.status(500).render("edit", {
        idea: req.body,
        error: error.message,
      });
    }
  },

  async deleteIdea(req, res) {
    const { id } = req.params;
    try {
      await ideaService.delete(id);
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
