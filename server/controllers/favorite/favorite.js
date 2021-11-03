const { user, favorite, actor, movie, user_movie } = require("../../models");
const { isAuthorized } = require("../auth/token");

module.exports = {
  favoriteActor: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      res.sendStatus(404);
    }
    const favoriteActor = await user.findOne({
      include: [
        {
          model: favorite,
          require: true,
          attributes: ["actorId"],
          include: [
            {
              model: actor,
              require: true,
              attributes: ["actorName", "image"],
            },
          ],
        },
      ],
      attributes: ["id", "username", "email"],
      where: {
        id: userInfo.id,
      },
    });

    res.status(201).send({
      favoriteActor,
    });
  },

  favoriteMovie: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { id } = req.params;

    if (!userInfo) {
      res.sendStatus(404);
    }

    await user_movie
      .findAll({
        where: {
          userId: userInfo.id,
          actorId: id,
        },
        attributes: ["id", "userId", "movieId", "actorId", "watch"],
        include: [
          {
            model: movie,
            require: true,
            attributes: ["id", "movieName", "movieImage"],
          },
        ],
      })
      .then((data) => {
        res.status(201).send({
          data,
        });
      });
  },

  watchButton: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { movieId, actorId } = req.body;

    await user_movie
      .update(
        {
          watch: true,
        },
        {
          userId: userInfo.id,
        }
      )
      .then(() => {
        res.sendStatus(201);
      });
  },

  deleteFavorite: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { id } = req.params;

    await favorite.destroy({
      where: {
        userId: userInfo.id,
        actorId: id,
      },
    });

    await user_movie
      .destroy({
        where: {
          userId: userInfo.id,
          actorId: id,
        },
      })
      .then(() => {
        res.sendStatus(201);
      });
  },
};
