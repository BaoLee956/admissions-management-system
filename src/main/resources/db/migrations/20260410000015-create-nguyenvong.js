'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NguyenVong', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      thiSinhId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ThiSinh', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      nganhId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Nganh', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      toHopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ToHopMon', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      thuTu: {
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

    // 🔥 mỗi thí sinh chỉ có 1 thứ tự
    await queryInterface.addConstraint('NguyenVong', {
      fields: ['thiSinhId', 'thuTu'],
      type: 'unique',
      name: 'unique_thisinh_thutu',
    });

    // 🔥 tránh đăng ký trùng ngành
    await queryInterface.addConstraint('NguyenVong', {
      fields: ['thiSinhId', 'nganhId'],
      type: 'unique',
      name: 'unique_thisinh_nganh',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('NguyenVong');
  },
};