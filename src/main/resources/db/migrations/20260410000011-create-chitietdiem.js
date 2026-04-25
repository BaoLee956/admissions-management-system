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

      sbd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ThiSinh',
          key: 'sbd',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maMon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MonHoc',
          key: 'maMon',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      diemSo: {
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
      fields: ['sbd', 'maMon'],
      type: 'unique',
      name: 'unique_thisinh_monhoc',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ChiTietDiem');
  },
};