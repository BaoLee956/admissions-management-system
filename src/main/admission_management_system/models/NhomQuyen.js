'use strict';

module.exports = function NhomQuyenModel(sequelize, DataTypes) {
  const NhomQuyen = sequelize.define(
    'NhomQuyen',
    {
      maNhom: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenNhom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      tableName: 'NhomQuyen',
      timestamps: true,
    }
  );

  return NhomQuyen;
};
