'use strict';

module.exports = function ChiTietDiemModel(sequelize, DataTypes) {
  const ChiTietDiem = sequelize.define(
    'ChiTietDiem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sbd: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'ThiSinh',
          key: 'sbd',
        },
      },
      maMon: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MonHoc',
          key: 'maMon',
        },
      },
      diemSo: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 10,
        },
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
      tableName: 'ChiTietDiem',
      timestamps: true,
    }
  );

  return ChiTietDiem;
};
