'use strict';

module.exports = function KhoaModel(sequelize, DataTypes) {
  const Khoa = sequelize.define(
    'Khoa',
    {
      maKhoa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenKhoa: {
        type: DataTypes.STRING,
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
      tableName: 'Khoa',
      timestamps: true,
    }
  );
  Khoa.associate = (models) => {
    Khoa.hasMany(models.Nganh, {
      foreignKey: 'maKhoa',
    });
  };
  return Khoa;
};
