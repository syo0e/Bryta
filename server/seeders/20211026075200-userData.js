"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        username: "kimcoding",
        email: "kimcoding@codestates.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "parkhacker",
        email: "parkhacker@codestates.com",
        password: "5678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
