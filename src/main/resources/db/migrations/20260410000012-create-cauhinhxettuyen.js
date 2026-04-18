'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CauHinhXetTuyen', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      dotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'DotTuyenSinh', key: 'id' },
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

      moTa: {
        type: Sequelize.STRING,
        allowNull: true,
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

    // 🔥 mỗi ngành mỗi đợt 1 config
    await queryInterface.addConstraint('CauHinhXetTuyen', {
      fields: ['dotId', 'nganhId'],
      type: 'unique',
      name: 'unique_config_dot_nganh',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CauHinhXetTuyen');
  },
};