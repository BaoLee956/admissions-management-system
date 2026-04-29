'use strict';

const CauHinhXetTuyen = require("./CauHinhXetTuyen");

module.exports = function CauTrucToHopModel(sequelize, DataTypes) {
  const CauTrucToHop = sequelize.define(
    'CauTrucToHop',
    {
      maToHop: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'ToHopMon',
          key: 'maToHop',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      maMon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'MonHoc',
          key: 'maMon',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      tableName: 'CauTrucToHop',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['maTohop', 'maMon'],
        },
      ],
    }
  );
  CauTrucToHop.associate = (models) => {
    CauHinhXetTuyen.belongsTo(models.ToHopMon, {
      foreignKey: 'maToHop',
    });
    CauHinhXetTuyen.belongsTo(models.MonHoc, {
      foreignKey: 'maMon',
    });
  };

  return CauTrucToHop;
};
