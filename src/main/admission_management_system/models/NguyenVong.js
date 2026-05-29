'use strict';

module.exports = function NguyenVongModel(sequelize, DataTypes) {
  const NguyenVong = sequelize.define(
    'NguyenVong',
    {
      maNguyenVong: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      sbd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ThiSinh',
          key: 'sbd',
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

      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ChiTieuTuyenSinh',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      maToHop: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ToHopMon',
          key: 'maToHop',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      thuTuUuTien: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      diemTong: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      trangThai: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
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
      tableName: 'NguyenVong',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['sbd', 'maDot', 'thuTuUuTien'],
        },
        {
          unique: true,
          fields: ['sbd', 'id'],
        },
      ],
    }
  );

  NguyenVong.associate = (models) => {
    NguyenVong.belongsTo(models.ThiSinh, {
      foreignKey: 'sbd',
    });

    NguyenVong.belongsTo(models.DotTuyenSinh, {
      foreignKey: 'maDot',
    });

    NguyenVong.belongsTo(models.ChiTieuTuyenSinh, {
      foreignKey: 'id',
    });

    NguyenVong.belongsTo(models.ToHopMon, {
      foreignKey: 'maToHop',
    });
  };

  return NguyenVong;
};