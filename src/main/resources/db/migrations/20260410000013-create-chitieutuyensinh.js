'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTieuTuyenSinh', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      nganhId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Nganh', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      dotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'DotTuyenSinh', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      soLuong: {
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

    // 🔥 mỗi ngành mỗi đợt chỉ có 1 chỉ tiêu
    await queryInterface.addConstraint('ChiTieuTuyenSinh', {
      fields: ['nganhId', 'dotId'],
      type: 'unique',
      name: 'unique_nganh_dot',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ChiTieuTuyenSinh');
  },
};