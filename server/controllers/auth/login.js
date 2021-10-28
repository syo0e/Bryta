const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./token");

const { user } = require("../../models");
module.exports = async (req, res) => {
  const { username, password } = req.body;
  const userInfo = await user.findOne({
    where: {
      username,
      password,
    },
  });
  if (!userInfo) {
    res.sendStatus(404);
  } else {
    const data = {
      username: userInfo.dataValues.username,
      email: userInfo.dataValues.email,
    };
    const aceessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    sendAccessToken(res, aceessToken, data);
    sendRefreshToken(res, refreshToken);
  }
};
