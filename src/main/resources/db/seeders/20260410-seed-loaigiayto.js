'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    // TODO: replace with real seed data
    await queryInterface.bulkInsert('LoaiGiayTo', [], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('LoaiGiayTo', null, {});
  },
};
