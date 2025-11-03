const Idea = require("../models/Idea");
const Category = require("../models/Category");

class IdeaService {
  async findAll() {
    try {
      return await Idea.findAll({
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Erro ao buscar ideias: " + error.message);
    }
  }

  async findById(id) {
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
        throw new Error("Ideia não encontrada");
      }

      return idea;
    } catch (error) {
      throw new Error("Erro ao buscar ideia: " + error.message);
    }
  }

  async create(ideaData) {
    try {
      return await Idea.create({
        title: ideaData.title,
        description: ideaData.description,
        categoryId: ideaData.categoryId,
        status: "Em Análise",
      });
    } catch (error) {
      throw new Error("Erro ao criar ideia: " + error.message);
    }
  }

  async update(id, ideaData) {
    try {
      const idea = await this.findById(id);

      await idea.update({
        title: ideaData.title,
        description: ideaData.description,
        categoryId: ideaData.categoryId,
        status: ideaData.status,
      });

      return idea;
    } catch (error) {
      throw new Error("Erro ao atualizar ideia: " + error.message);
    }
  }

  async delete(id) {
    try {
      const idea = await this.findById(id);
      await idea.destroy();
      return true;
    } catch (error) {
      throw new Error("Erro ao deletar ideia: " + error.message);
    }
  }

  async getAllCategories() {
    try {
      return await Category.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar categorias: " + error.message);
    }
  }
}

module.exports = new IdeaService();
