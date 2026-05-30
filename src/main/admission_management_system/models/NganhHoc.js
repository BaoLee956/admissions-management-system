'use strict';

module.exports = function NganhHocModel(sequelize, DataTypes) {
  const NganhHoc = sequelize.define(
    'NganhHoc',
    {
      maNganh: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      tenNganh: {
        type: DataTypes.STRING,
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
      tableName: 'NganhHoc',
      timestamps: true,
    }
  );

  NganhHoc.associate = (models) => {
    NganhHoc.hasMany(models.KetQuaXetTuyen, {
      foreignKey: 'maNganh',
      as: 'ketQuaXetTuyens',
    });
  };

  return NganhHoc;
};
