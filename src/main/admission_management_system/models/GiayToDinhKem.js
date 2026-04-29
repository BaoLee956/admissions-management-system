'use strict';

module.exports = function GiayToDinhKemModel(sequelize, DataTypes) {
  const GiayToDinhKem = sequelize.define(
    'GiayToDinhKem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      maHoSo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'HoSoNhapHoc',
          key: 'maHoSo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maLoai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'LoaiGiayTo',
          key: 'maLoai',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      duongDanFile: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      ghiChuLoi: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: 'GiayToDinhKem',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['maHoSo', 'maLoai'],
        },
      ],
    }
  );

  GiayToDinhKem.associate = (models) => {
    GiayToDinhKem.belongsTo(models.HoSoNhapHoc, {
      foreignKey: 'maHoSo',
    });

    GiayToDinhKem.belongsTo(models.LoaiGiayTo, {
      foreignKey: 'maLoai',
    });
  };

  return GiayToDinhKem;
};