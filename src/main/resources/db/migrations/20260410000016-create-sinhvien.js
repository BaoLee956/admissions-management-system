'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SinhVien', {

      id: { // 🔥 UUID nội bộ
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      MSSV: { // 🔥 MSSV hiển thị
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      maHoSo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'HoSoNhapHoc',
          key: 'maHoSo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      lopSH: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      namNhapHoc: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('SinhVien');
  },
};