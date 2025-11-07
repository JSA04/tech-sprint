const { fn, col, literal } = require('sequelize');
const Idea = require("../models/Idea");
const Category = require("../models/Category");
const User = require("../models/User");
const Vote = require("../models/Vote");

class IdeaService {
  async findAll(userId) {
    try {
      const ideas = await Idea.findAll({
        attributes: {
          include: [
            [
              fn('GREATEST',
                fn('COALESCE', fn('SUM', col('votes.weight')), 0),
                0
              ),
              'voteScore'
            ],
            [
              literal(`EXISTS (
                SELECT 1 FROM votes AS v
                WHERE v.ideaId = Idea.id AND v.userId = ${userId} AND v.weight = 1
              )`),
              'userAgreed'
            ],
            [
              literal(`EXISTS (
                SELECT 1 FROM votes AS v
                WHERE v.ideaId = Idea.id AND v.userId = ${userId} AND v.weight = -1
              )`),
              'userDisagreed'
            ]
          ],
        },
        include: [
          {
            model: Category,
            as: 'category',
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'name'],
          },
          {
            model: Vote,
            as: 'votes',
            attributes: [],
          },
        ],
        group: ['Idea.id', 'category.id', 'creator.id'],
        order: [[fn('SUM', col('votes.weight')), 'DESC']],
      });

      return ideas.map(i => {
        const data = i.toJSON();
        return {
          ...data,
          voteScore: Number(data.voteScore) || 0,
          userAgreed: Boolean(Number(data.userAgreed)),
          userDisagreed: Boolean(Number(data.userDisagreed)),
        };
      });
    } catch (error) {
      throw new Error("Erro ao buscar ideias: " + error.message);
    }
  }

  async findById(id, userId) {
    try {
      const idea = await Idea.findOne({
        where: { id },
        attributes: {
          include: [
            [
              fn('GREATEST',
                fn('COALESCE', fn('SUM', col('votes.weight')), 0),
                0
              ),
              'voteScore'
            ],
            [
              literal(`EXISTS (
                SELECT 1 FROM votes AS v
                WHERE v.ideaId = Idea.id AND v.userId = ${userId} AND v.weight = 1
              )`),
              'userAgreed'
            ],
            [
              literal(`EXISTS (
                SELECT 1 FROM votes AS v
                WHERE v.ideaId = Idea.id AND v.userId = ${userId} AND v.weight = -1
              )`),
              'userDisagreed'
            ]
          ],
        },
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
          {
            model: Vote,
            as: 'votes',
            attributes: [],
          },
        ],
        group: ['Idea.id', 'category.id', 'creator.id'],
      });

      if (!idea) {
        throw new Error("Ideia não encontrada");
      }

      const data = idea.toJSON();
      return {
        ...data,
        voteScore: Number(data.voteScore) || 0,
        userAgreed: Boolean(Number(data.userAgreed)),
        userDisagreed: Boolean(Number(data.userDisagreed)),
      };
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
        createdBy: userId,
      });
    } catch (error) {
      throw new Error("Erro ao criar ideia: " + error.message);
    }
  }

  async update(id, ideaData, userId) {
    if (userId != ideaData.created_by) {
      throw new Error("Usuário não autorizado a atualizar esta ideia");
      console.log('hello world')
    }
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
