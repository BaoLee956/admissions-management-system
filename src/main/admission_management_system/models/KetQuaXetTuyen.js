'use strict';

module.exports = function KetQuaXetTuyenModel(sequelize, DataTypes) {
  const KetQuaXetTuyen = sequelize.define(
    'KetQuaXetTuyen',
    {
      sbd: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'ThiSinh',
          key: 'sbd',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      maNganh: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'NganhHoc',
          key: 'maNganh',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      diemToan: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      diemLy: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      diemHoa: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      diemCong: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tongDiem: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      trangThai: {
        type: DataTypes.STRING,
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
      tableName: 'KetQuaXetTuyen',
      timestamps: true,
    }
  );

  KetQuaXetTuyen.associate = (models) => {
    KetQuaXetTuyen.belongsTo(models.ThiSinh, {
      foreignKey: 'sbd',
      as: 'thiSinh',
    });
    KetQuaXetTuyen.belongsTo(models.NganhHoc, {
      foreignKey: 'maNganh',
      as: 'nganhHoc',
    });
  };

  return KetQuaXetTuyen;
};
