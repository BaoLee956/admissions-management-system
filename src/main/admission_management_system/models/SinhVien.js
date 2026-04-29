'use strict';

module.exports = function SinhVienModel(sequelize, DataTypes) {
  const SinhVien = sequelize.define(
    'SinhVien',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      MSSV: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      maHoSo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'HoSoNhapHoc',
          key: 'maHoSo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      lopSH: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      namNhapHoc: {
        type: DataTypes.INTEGER,
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
      tableName: 'SinhVien',
      timestamps: true,
    }
  );

  SinhVien.associate = (models) => {
    SinhVien.belongsTo(models.HoSoNhapHoc, {
      foreignKey: 'maHoSo',
    });
  };

  return SinhVien;
};