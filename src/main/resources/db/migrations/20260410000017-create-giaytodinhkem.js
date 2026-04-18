'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GiayToDinhKem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      hoSoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HoSoNhapHoc',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      loaiGiayToId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'LoaiGiayTo',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      trangThai: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PENDING', // APPROVED / REJECTED
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

    // 🔥 mỗi hồ sơ chỉ có 1 giấy tờ mỗi loại
    await queryInterface.addConstraint('GiayToDinhKem', {
      fields: ['hoSoId', 'loaiGiayToId'],
      type: 'unique',
      name: 'unique_hoso_loaigiayto',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('GiayToDinhKem');
  },
};