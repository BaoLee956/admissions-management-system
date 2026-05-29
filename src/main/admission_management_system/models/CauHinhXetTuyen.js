'use strict';

module.exports = function CauHinhXetTuyenModel(sequelize, DataTypes) {
  const CauHinhXetTuyen = sequelize.define(
    'CauHinhXetTuyen',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      maToHop: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ToHopMon',
          key: 'maToHop',
        },
      },
      maNganh: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Nganh',
          key: 'maNganh',
        },
      },
      maDot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'DotTuyenSinh',
          key: 'maDot',
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
      tableName: 'CauHinhXetTuyen',
      timestamps: true,
    }
  );

  return CauHinhXetTuyen;
};
