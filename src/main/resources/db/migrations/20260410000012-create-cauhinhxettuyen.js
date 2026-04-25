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

      maToHop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ToHopMon', key: 'maToHop' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maNganh: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Nganh', key: 'maNganh' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      maDot: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'DotTuyenSinh', key: 'maDot' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      fields: ['maNganh', 'maToHop', 'maDot'],
      type: 'unique',
      name: 'unique_config_dot_nganh',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CauHinhXetTuyen');
  },
};