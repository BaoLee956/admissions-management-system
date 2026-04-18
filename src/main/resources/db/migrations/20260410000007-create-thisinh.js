'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThiSinh', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      hoTen: Sequelize.STRING,
      email: Sequelize.STRING,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ThiSinh');
  },
};
