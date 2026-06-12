'use strict';

module.exports = function ToHopMonModel(sequelize, DataTypes) {
  const ToHopMon = sequelize.define(
    'ToHopMon',
    {
      maToHop: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      moTa: {
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
      tableName: 'ToHopMon',
      timestamps: true,
    }
  );

  // ✔ Bảng này không có FK → không cần associate
  ToHopMon.associate = (models) => {
    ToHopMon.hasMany(models.CauHinhXetTuyen, {
      foreignKey: 'maToHop',
    });

    ToHopMon.hasMany(models.NguyenVong, {
      foreignKey: 'maToHop',
    });

    ToHopMon.hasMany(models.CauTrucToHop, {
      foreignKey: 'maToHop',
    });
  };

  return ToHopMon;
};