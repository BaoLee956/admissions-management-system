'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HoSoNhapHoc', {
      maHoSo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      sbd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // 🔥 mỗi thí sinh 1 hồ sơ
        references: { model: 'ThiSinh', key: 'sbd' },
        onUpdate: 'CASCADE',
<<<<<<< HEAD
        onDelete: 'RESTRICT',
      },
      nguoiDuyet:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'NhanVien', key: 'maNhanVien' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
=======
        onDelete: 'CASCADE',
>>>>>>> origin/feature/candidate-ui-week2
      },

      trangThai: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
      },

<<<<<<< HEAD
      ngayNop: {
        type: Sequelize.DATE,
        allowNull: false,
      },

=======
>>>>>>> origin/feature/candidate-ui-week2
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
    await queryInterface.dropTable('HoSoNhapHoc');
  },
};