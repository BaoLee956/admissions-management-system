'use strict';

module.exports = function MonHocModel(sequelize, DataTypes) {
  const MonHoc = sequelize.define(
    'MonHoc',
    {
      maMon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenMon: {
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
      tableName: 'MonHoc',
      timestamps: true,
    }
  );
  MonHoc.associate = (models) => {
    MonHoc.hasMany(models.CauTrucToHop, {
      foreignKey: 'maMon',
    });

    MonHoc.hasMany(models.ChiTietDiem, {
      foreignKey: 'maMon',
    });
  };
  return MonHoc;
};
