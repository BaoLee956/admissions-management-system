'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create NganhHoc table
    await queryInterface.createTable('NganhHoc', {
      maNganh: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      tenNganh: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      diemChuan: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create KetQuaXetTuyen table
    await queryInterface.createTable('KetQuaXetTuyen', {
      sbd: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'NganhHoc',
          key: 'maNganh',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      diemToan: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      diemLy: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      diemHoa: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      diemCong: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tongDiem: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      trangThai: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KetQuaXetTuyen');
    await queryInterface.dropTable('NganhHoc');
  },
};
