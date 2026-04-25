'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NhanVien', {
      
      maNhanVien: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      hoTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      matKhau: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      trangThai: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // true = active
      },

      maNhom: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NhomQuyen',
          key: 'maNhom',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    await queryInterface.dropTable('NhanVien');
  },
};
