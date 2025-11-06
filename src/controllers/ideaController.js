const ideaService = require("../services/IdeaService");

module.exports = {
  async findAllIdeas(req, res) {
    try {
      const ideas = await ideaService.findAll(req.session.user.id);
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
      res.render("all", { ideas: [idea] });
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
      await ideaService.create(req.body, req.session.user.id);
      req.flash("success_msg", "Ideia criada com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error_msg", error.message);
      res.redirect("/ideas/new");
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
      req.flash("success_msg", "Ideia atualizada com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error_msg", error.message);
      res.redirect(`/ideas/${id}/edit`);
    }
  },

  async deleteIdea(req, res) {
    const { id } = req.params;
    try {
      await ideaService.delete(id);
      req.flash("success_msg", "Ideia excluída com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error_msg", error.message);
      res.redirect("/ideas");
    }
  },
};
