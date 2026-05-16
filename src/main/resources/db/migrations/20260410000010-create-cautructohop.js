'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CauTrucToHop', {

      maToHop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ToHopMon',
          key: 'maToHop',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maMon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey : true, 
        references: {
          model: 'MonHoc',
          key: 'maMon',
        },
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

    // 🔥 unique composite (cực quan trọng)
    await queryInterface.addConstraint('CauTrucToHop', {
      fields: ['maToHop', 'maMon'],
      type: 'unique',
      name: 'unique_toHop_monHoc',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CauTrucToHop');
  },
};