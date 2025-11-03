const Idea = require("../models/Idea");
const Category = require("../models/Category");

module.exports = {
  async findAllIdeas(req, res) {
    try {
      const ideas = await Idea.findAll({
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.render("all", { ideas });
    } catch (error) {
      console.error(error);
      res.status(500).render("all", {
        ideas: [],
        error: "Erro ao carregar ideias",
      });
    }
  },

  async findIdeaById(req, res) {
    const { id } = req.params;
    try {
      const idea = await Idea.findOne({
        where: { id },
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      });

      if (!idea) {
        return res.status(404).json({ error: "Ideia não encontrada" });
      }

      res.render("idea", { idea });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar ideia" });
    }
  },

  async createIdeaForm(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("create", { categories });
    } catch (error) {
      console.error(error);
      res.status(500).render("create", {
        categories: [],
        error: "Erro ao carregar categorias",
      });
    }
  },

  async saveNewIdea(req, res) {
    const { title, description, categoryId } = req.body;

    try {
      await Idea.create({
        title,
        description,
        categoryId,
        status: "Em Análise",
      });

      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      const categories = await Category.findAll();
      res.render("create", {
        categories,
        error: "Erro ao criar ideia",
        data: req.body,
      });
    }
  },

  async editIdeaForm(req, res) {
    const { id } = req.params;
    try {
      const idea = await Idea.findByPk(id);
      const categories = await Category.findAll();

      if (!idea) {
        return res.status(404).redirect("/ideas");
      }

      res.render("edit", { idea, categories });
    } catch (error) {
      console.error(error);
      res.status(500).redirect("/ideas");
    }
  },

  async updateIdea(req, res) {
    const { id } = req.params;
    const { title, description, categoryId, status } = req.body;

    try {
      const idea = await Idea.findByPk(id);

      if (!idea) {
        return res.status(404).json({ error: "Ideia não encontrada" });
      }

      await idea.update({
        title,
        description,
        categoryId,
        status,
      });

      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      res.status(500).render("edit", {
        idea: req.body,
        error: "Erro ao atualizar ideia",
      });
    }
  },

  async deleteIdea(req, res) {
    const { id } = req.params;

    try {
      const idea = await Idea.findByPk(id);

      if (!idea) {
        return res.status(404).json({ error: "Ideia não encontrada" });
      }

      await idea.destroy();
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar ideia" });
    }
  },
};
