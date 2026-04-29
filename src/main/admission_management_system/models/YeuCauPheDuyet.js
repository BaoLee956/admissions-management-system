'use strict';

module.exports = function YeuCauPheDuyetModel(sequelize, DataTypes) {
  const YeuCauPheDuyet = sequelize.define(
    'YeuCauPheDuyet',
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
        unique: true,
        references: {
          model: 'HoSoNhapHoc',
          key: 'maHoSo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maNhanVien: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'NhanVien',
          key: 'maNhanVien',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      loaiYeuCau: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      liDoYeuCau: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      liDoTuChoi: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      trangThai: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
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
      tableName: 'YeuCauPheDuyet',
      timestamps: true,
    }
  );

  YeuCauPheDuyet.associate = (models) => {
    YeuCauPheDuyet.belongsTo(models.HoSoNhapHoc, {
      foreignKey: 'maHoSo',
    });

    YeuCauPheDuyet.belongsTo(models.NhanVien, {
      foreignKey: 'maNhanVien',
    });
  };

  return YeuCauPheDuyet;
};