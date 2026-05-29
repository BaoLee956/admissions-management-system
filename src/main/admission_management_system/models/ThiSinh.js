'use strict';

module.exports = function ThiSinhModel(sequelize, DataTypes) {
  const ThiSinh = sequelize.define(
    'ThiSinh',
    {
      sbd: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      hoTen: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      ngaySinh: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      gioiTinh: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      sdt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      cccd: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      diaChi: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      khuVuc: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      doiTuongUuTien: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      otp_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      otp_expires: {
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
      tableName: 'ThiSinh',
      timestamps: true,
    }
  );

  ThiSinh.associate = (models) => {
    ThiSinh.hasMany(models.NguyenVong, {
      foreignKey: 'sbd',
    });

    ThiSinh.hasMany(models.ChiTietDiem, {
      foreignKey: 'sbd',
    });

    ThiSinh.hasOne(models.HoSoNhapHoc, {
      foreignKey: 'sbd',
    });
  };

  return ThiSinh;
};