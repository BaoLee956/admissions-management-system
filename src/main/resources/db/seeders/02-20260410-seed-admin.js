'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    const adminGroup = await queryInterface.sequelize.query(
      'SELECT "maNhom" FROM "NhomQuyen" WHERE "tenNhom" = \'Admin\' LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (adminGroup.length === 0) {
      console.log('⚠️  Admin permission group not found. Skipping admin staff creation.');
      return;
    }

    const adminGroupId = adminGroup[0].maNhom;

    await queryInterface.bulkInsert('NhanVien', [
      {
        hoTen: 'Administrator',
        email: 'admin@ptit.edu.vn', // Đã bổ sung email
        matKhau: '123456',          // Đã bổ sung mật khẩu
        trangThai: true,
        maNhom: adminGroupId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('NhanVien', { hoTen: 'Administrator' }, {});
  },
};