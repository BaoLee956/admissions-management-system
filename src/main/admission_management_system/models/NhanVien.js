'use strict';

module.exports = function NhanVienModel(sequelize, DataTypes) {
  const NhanVien = sequelize.define(
    'NhanVien',
    {
      maNhanVien: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      hoTen: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      matKhau: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      trangThai: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      maNhom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'NhomQuyen',
          key: 'maNhom',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'NhanVien',
      timestamps: true,
    }
  );

  NhanVien.associate = (models) => {
    NhanVien.hasMany(models.HoSoNhapHoc, {
      foreignKey: 'nguoiDuyet',
    });

    NhanVien.hasMany(models.YeuCauPheDuyet, {
      foreignKey: 'maNhanVien',
    });
  };

  return NhanVien;
};