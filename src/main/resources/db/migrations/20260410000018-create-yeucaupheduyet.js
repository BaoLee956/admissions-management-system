'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('YeuCauPheDuyet', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      maHoSo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // 🔥 1 hồ sơ = 1 request active
        references: {
          model: 'HoSoNhapHoc',
          key: 'maHoSo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maNhanVien: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NhanVien',
          key: 'maNhanVien',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      trangThai: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PENDING', // APPROVED / REJECTED
      },

      ghiChu: {
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('YeuCauPheDuyet');
  },
};