'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThiSinh', {
      sbd: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hoTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ngaySinh: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gioiTinh: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      sdt: {
        type: Sequelize.STRING,
        allowNull: false,
        unique : true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique : true,
      },
      diaChi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      khuVuc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      doiTuongUuTien: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp_expires: {
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
    await queryInterface.dropTable('ThiSinh');
  },
};
