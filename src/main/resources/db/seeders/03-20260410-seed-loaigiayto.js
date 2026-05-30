'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    // Đã đóng băng dòng này lại để tránh lỗi cú pháp mảng rỗng
    // await queryInterface.bulkInsert('LoaiGiayTo', [], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('LoaiGiayTo', null, {});
  },
};