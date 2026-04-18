'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    // Lấy ID của nhóm Admin
    const adminGroup = await queryInterface.sequelize.query(
      'SELECT id FROM "NhomQuyen" WHERE "tenNhom" = \'Admin\' LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (adminGroup.length === 0) {
      console.log('⚠️  Admin permission group not found. Skipping admin staff creation.');
      return;
    }

    const adminGroupId = adminGroup[0].id;

    await queryInterface.bulkInsert('NhanVien', [
      {
        hoTen: 'Administrator',
        nhomQuyenId: adminGroupId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('NhanVien', { hoTen: 'Administrator' }, {});
  },
};
