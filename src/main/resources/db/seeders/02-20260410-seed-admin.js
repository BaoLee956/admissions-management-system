'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    const adminGroup = await queryInterface.sequelize.query(
      'SELECT "maNhom" FROM "NhomQuyen" WHERE "tenNhom" = \'Admin\' LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const officerGroup = await queryInterface.sequelize.query(
      'SELECT "maNhom" FROM "NhomQuyen" WHERE "tenNhom" = \'Officer\' LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (adminGroup.length === 0) {
      console.log('⚠️  Admin permission group not found. Skipping admin staff creation.');
      return;
    }

    const adminGroupId = adminGroup[0].maNhom;
    const officerGroupId = officerGroup.length > 0 ? officerGroup[0].maNhom : null;

    const staffs = [
      {
        hoTen: 'Administrator',
        email: 'admin@ptit.edu.vn',
        matKhau: '123456',
        trangThai: true,
        maNhom: adminGroupId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    if (officerGroupId) {
      staffs.push({
        hoTen: 'Officer User',
        email: 'officer@ptit.edu.vn',
        matKhau: '123456',
        trangThai: true,
        maNhom: officerGroupId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      console.log('⚠️  Officer permission group not found. Skipping officer staff creation.');
    }

    await queryInterface.bulkInsert('NhanVien', staffs, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('NhanVien', {
      email: ['admin@ptit.edu.vn', 'officer@ptit.edu.vn']
    }, {});
  },
};