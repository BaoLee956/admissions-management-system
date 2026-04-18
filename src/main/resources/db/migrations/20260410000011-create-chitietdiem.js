'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietDiem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      thiSinhId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ThiSinh',
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

      diem: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 10,
        },
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

    // mỗi thí sinh chỉ có 1 điểm / môn
    await queryInterface.addConstraint('ChiTietDiem', {
      fields: ['thiSinhId', 'monHocId'],
      type: 'unique',
      name: 'unique_thisinh_monhoc',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ChiTietDiem');
  },
};