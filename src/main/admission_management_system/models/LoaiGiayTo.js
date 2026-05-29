'use strict';

module.exports = function LoaiGiayToModel(sequelize, DataTypes) {
  const LoaiGiayTo = sequelize.define(
    'LoaiGiayTo',
    {
      maLoai: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenLoai: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      batBuoc: {
        type: DataTypes.BOOLEAN,
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
      tableName: 'LoaiGiayTo',
      timestamps: true,
    }
  );
  LoaiGiayTo.associate = (models) => {
    LoaiGiayTo.hasMany(models.GiayToDinhKem, {
      foreignKey: 'maLoai',
    });
  };
  return LoaiGiayTo;
};
