'use strict';

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
          fields: ['maToHop', 'maMon'], // ✔ sửa typo
        },
      ],
    }
  );

  // =========================
  // ASSOCIATIONS (CHUẨN)
  // =========================
  CauTrucToHop.associate = (models) => {
    // bảng trung gian → belongsTo 2 phía
    CauTrucToHop.belongsTo(models.ToHopMon, {
      foreignKey: 'maToHop',
    });

    CauTrucToHop.belongsTo(models.MonHoc, {
      foreignKey: 'maMon',
    });
  };

  return CauTrucToHop;
};