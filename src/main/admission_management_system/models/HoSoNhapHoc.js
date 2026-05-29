'use strict';

module.exports = function HoSoNhapHocModel(sequelize, DataTypes) {
  const HoSoNhapHoc = sequelize.define(
    'HoSoNhapHoc',
    {
      maHoSo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      sbd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'ThiSinh',
          key: 'sbd',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      nguoiDuyet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'NhanVien',
          key: 'maNhanVien',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      trangThai: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
      },

      ngayNop: {
        type: DataTypes.DATE,
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
      tableName: 'HoSoNhapHoc',
      timestamps: true,
    }
  );

  HoSoNhapHoc.associate = (models) => {
    HoSoNhapHoc.belongsTo(models.ThiSinh, {
      foreignKey: 'sbd',
    });

    HoSoNhapHoc.belongsTo(models.NhanVien, {
      foreignKey: 'nguoiDuyet',
    });

    HoSoNhapHoc.hasOne(models.SinhVien, {
      foreignKey: 'maHoSo',
    });

    HoSoNhapHoc.hasMany(models.GiayToDinhKem, {
      foreignKey: 'maHoSo',
    });

    HoSoNhapHoc.hasMany(models.YeuCauPheDuyet, {
      foreignKey: 'maHoSo',
    });
  };

  return HoSoNhapHoc;
};