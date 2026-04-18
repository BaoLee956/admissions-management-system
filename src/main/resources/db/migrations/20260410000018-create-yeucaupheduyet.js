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

      hoSoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // 🔥 1 hồ sơ = 1 request active
        references: {
          model: 'HoSoNhapHoc',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      nhanVienId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NhanVien',
          key: 'id',
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