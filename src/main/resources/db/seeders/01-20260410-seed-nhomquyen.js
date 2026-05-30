'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('NhomQuyen', [
      {
        tenNhom: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tenNhom: 'Officer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tenNhom: 'Candidate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('NhomQuyen', null, {});
  },
};
