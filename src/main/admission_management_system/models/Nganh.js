'use strict';

module.exports = function NganhModel(sequelize, DataTypes) {
  const Nganh = sequelize.define(
    'Nganh',
    {
      maNganh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenNganh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maKhoa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Khoa',
          key: 'maKhoa',
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
      tableName: 'Nganh',
      timestamps: true,
    }
  );
  Nganh.associate = (models) => {
    Nganh.belongsTo(models.Khoa, {
      foreignKey: 'maKhoa',
    });

    Nganh.hasMany(models.ChiTieuTuyenSinh, {
      foreignKey: 'maNganh',
    });

    Nganh.hasMany(models.CauHinhXetTuyen, {
      foreignKey: 'maNganh',
    });
  };

  return Nganh;
};
