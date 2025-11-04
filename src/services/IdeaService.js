const Idea = require("../models/Idea");
const Category = require("../models/Category");
const User = require("../models/User");

class IdeaService {
  async findAll() {
    try {
      return await Idea.findAll({
        include: [
          {
            model: Category,
            as: "category",
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "name"],
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
          {
            model: User,
            as: "creator",
            attributes: ["id", "name"],
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

  async create(ideaData, userId) {
    try {
      return await Idea.create({
        title: ideaData.title,
        description: ideaData.description,
        categoryId: ideaData.categoryId,
        created_by: userId,
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
      const categories = await Category.findAll({
        attributes: ["id", "name"],
        raw: true,
      });

      if (!categories || categories.length === 0) {
        for (const category of defaultCategories) {
          await Category.create(category);
        }

        return await Category.findAll({
          attributes: ["id", "name"],
          raw: true,
        });
      }

      return categories;
    } catch (error) {
      throw new Error("Erro ao buscar categorias: " + error.message);
    }
  }
}

module.exports = new IdeaService();
