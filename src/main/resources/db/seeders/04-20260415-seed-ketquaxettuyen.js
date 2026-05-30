'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    // 1. Insert NganhHoc
    await queryInterface.bulkInsert('NganhHoc', [
      {
        maNganh: '7480201',
        tenNganh: 'Công nghệ thông tin',
        diemChuan: 24.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    // 2. Ensure candidate with SBD '12345678' exists in ThiSinh table to satisfy FK constraint
    const candidates = await queryInterface.sequelize.query(
      'SELECT sbd FROM "ThiSinh" WHERE sbd = \'12345678\' LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (candidates.length === 0) {
      await queryInterface.bulkInsert('ThiSinh', [
        {
          sbd: '12345678',
          hoTen: 'Nguyễn Văn A',
          ngaySinh: new Date('2005-01-01'),
          gioiTinh: true,
          sdt: '0987654321',
          cccd: '123456789012',
          email: 'nguyenvana@example.com',
          diaChi: 'Hà Nội',
          khuVuc: 'KV1',
          doiTuongUuTien: 'ND1',
          otp_code: '123456',
          otp_expires: new Date(Date.now() + 3600000),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    }

    // 3. Insert KetQuaXetTuyen
    await queryInterface.bulkInsert('KetQuaXetTuyen', [
      {
        sbd: '12345678',
        maNganh: '7480201',
        diemToan: 8.5,
        diemLy: 9.0,
        diemHoa: 7.0,
        diemCong: 2.25,
        tongDiem: 26.75,
        trangThai: 'TRÚNG TUYỂN',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface) {
    // Delete in reverse order of foreign key dependencies
    await queryInterface.bulkDelete('KetQuaXetTuyen', { sbd: '12345678' }, {});
    await queryInterface.bulkDelete('ThiSinh', { sbd: '12345678' }, {});
    await queryInterface.bulkDelete('NganhHoc', { maNganh: '7480201' }, {});
  },
};
