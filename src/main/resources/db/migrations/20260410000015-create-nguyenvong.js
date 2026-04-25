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

      maNganh: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Nganh', key: 'maNganh' },
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

    // 🔥 tránh đăng ký trùng ngành
    await queryInterface.addConstraint('NguyenVong', {
      fields: ['sbd', 'maDot', 'maNganh'],
      type: 'unique',
      name: 'unique_thisinh_nganh',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('NguyenVong');
  },
};