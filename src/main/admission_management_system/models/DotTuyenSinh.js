'use strict';

module.exports = function DotTuyenSinhModel(sequelize, DataTypes) {
  const DotTuyenSinh = sequelize.define(
    'DotTuyenSinh',
    {
      maDot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nam: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tenDot: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thoiGianBatDau: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      thoiGianKetThuc: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: 'DotTuyenSinh',
      timestamps: true,
    }
  );
  DotTuyenSinh.associate = (models) => {
    DotTuyenSinh.hasMany(models.ChiTieuTuyenSinh, {
      foreignKey: 'maDot',
    });

    DotTuyenSinh.hasMany(models.NguyenVong, {
      foreignKey: 'maDot',
    });
  };
  return DotTuyenSinh;
};
