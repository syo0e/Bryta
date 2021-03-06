const { actor } = require("../../models");

module.exports = {
  search: async (req, res) => {
    await actor
      .findOne({
        where: { actorName: req.query },
      })
      .then((data) => {
        const payload = {
          id: data.dataValues.id,
          actorid: data.dataValues.actorid,
          actorName: data.dataValues.actorName,
          actorImage: data.dataValues.actorImage,
        };
      });
    res.status(200).send({ payload });
  },
};
