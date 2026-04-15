'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    // TODO: replace with real seed data
    await queryInterface.bulkInsert('Admins', [], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
