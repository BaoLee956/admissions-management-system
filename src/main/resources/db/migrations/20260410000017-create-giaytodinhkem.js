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

      maHoSo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HoSoNhapHoc',
          key: 'maHoSo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maLoai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'LoaiGiayTo',
          key: 'maLoai',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      duongDanFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      ghiChuLoi: {
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

    // 🔥 mỗi hồ sơ chỉ có 1 giấy tờ mỗi loại
    await queryInterface.addConstraint('GiayToDinhKem', {
      fields: ['maHoSo', 'maLoai'],
      type: 'unique',
      name: 'unique_hoso_loaigiayto',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('GiayToDinhKem');
  },
};