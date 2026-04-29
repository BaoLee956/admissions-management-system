'use strict';

module.exports = function ChiTieuTuyenSinhModel(sequelize, DataTypes) {
  const ChiTieuTuyenSinh = sequelize.define(
    'ChiTieuTuyenSinh',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      maNganh: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Nganh',
          key: 'maNganh',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      maDot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'DotTuyenSinh',
          key: 'maDot',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      soLuong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      diemChuan: {
        type: DataTypes.FLOAT,
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
      tableName: 'ChiTieuTuyenSinh',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['maNganh', 'maDot'],
        },
      ],
    }
  );
  ChiTieuTuyenSinh.associate = (models) => {
    ChiTieuTuyenSinh.belongsTo(models.Nganh, {
      foreignKey: 'maNganh',
    });

    ChiTieuTuyenSinh.belongsTo(models.DotTuyenSinh, {
      foreignKey: 'maDot',
    });

    ChiTieuTuyenSinh.hasMany(models.NguyenVong, {
      foreignKey: 'id',
    });
  };

  return ChiTieuTuyenSinh;
};
