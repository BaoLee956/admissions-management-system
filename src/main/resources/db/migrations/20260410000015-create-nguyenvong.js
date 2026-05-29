'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NguyenVong', {
      maNguyenVong: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      sbd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ThiSinh', key: 'sbd' },
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

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ChiTieuTuyenSinh', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maToHop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ToHopMon', key: 'maToHop' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      thuTuUuTien: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      
      diemTong: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      trangThai: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        allowNull: false,
        defaultValue: 'PENDING',
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
      fields: ['sbd', 'maDot', 'thuTuUuTien'],
      type: 'unique',
      name: 'unique_thisinh_thutu',
    });

    // 🔥 mỗi thí sinh chỉ có 1 chỉ tiêu
    await queryInterface.addConstraint('NguyenVong', {
      fields: ['sbd', 'id'],
      type: 'unique',
      name: 'unique_thisinh_chitieu',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('NguyenVong');
  },
};