'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DotTuyenSinh', {
      maDot: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tenDot: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      thoiGianBatDau: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      thoiGianKetThuc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('DotTuyenSinh');
  },
};