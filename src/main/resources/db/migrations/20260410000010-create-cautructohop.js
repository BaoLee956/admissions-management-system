'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CauTrucToHop', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      toHopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ToHopMon',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      monHocId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MonHoc',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      heSo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 1,
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

    // 🔥 unique composite (cực quan trọng)
    await queryInterface.addConstraint('CauTrucToHop', {
      fields: ['toHopId', 'monHocId'],
      type: 'unique',
      name: 'unique_toHop_monHoc',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CauTrucToHop');
  },
};