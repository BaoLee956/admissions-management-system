'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentTime = new Date();

    // 1. Tạo 5 Thí sinh
    await queryInterface.bulkInsert('ThiSinh', [
      { sbd: '00000002', cccd: '001205000002', hoTen: 'Nguyễn Văn An', ngaySinh: '2005-01-01', gioiTinh: true, sdt: '0901111111', email: 'an.nguyen@gmail.com', diaChi: 'TP.HCM', khuVuc: 'KV3', doiTuongUuTien: 'Không', otp_code: '123456', otp_expires: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000003', cccd: '001205000003', hoTen: 'Trần Thị Bình', ngaySinh: '2005-02-02', gioiTinh: false, sdt: '0902222222', email: 'binh.tran@gmail.com', diaChi: 'Hà Nội', khuVuc: 'KV1', doiTuongUuTien: 'Đối tượng 01', otp_code: '123456', otp_expires: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000004', cccd: '001205000004', hoTen: 'Lê Hoàng Cường', ngaySinh: '2005-03-03', gioiTinh: true, sdt: '0903333333', email: 'cuong.le@gmail.com', diaChi: 'Đà Nẵng', khuVuc: 'KV2', doiTuongUuTien: 'Không', otp_code: '123456', otp_expires: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000005', cccd: '001205000005', hoTen: 'Phạm Phương Dung', ngaySinh: '2005-04-04', gioiTinh: false, sdt: '0904444444', email: 'dung.pham@gmail.com', diaChi: 'Cần Thơ', khuVuc: 'KV2-NT', doiTuongUuTien: 'Đối tượng 06', otp_code: '123456', otp_expires: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000006', cccd: '001205000006', hoTen: 'Vũ Đức Em', ngaySinh: '2005-05-05', gioiTinh: true, sdt: '0905555555', email: 'em.vu@gmail.com', diaChi: 'Hải Phòng', khuVuc: 'KV3', doiTuongUuTien: 'Không', otp_code: '123456', otp_expires: currentTime, createdAt: currentTime, updatedAt: currentTime }
    ], {});

    // 2. Tạo kết quả TRÚNG TUYỂN
    await queryInterface.bulkInsert('KetQuaXetTuyen', [
      { sbd: '00000002', maNganh: 'CNTT', diemToan: 8.5, diemLy: 9.0, diemHoa: 9.0, diemCong: 0, tongDiem: 26.5, trangThai: 'TRÚNG TUYỂN', createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000003', maNganh: 'KTMT', diemToan: 8.0, diemLy: 8.5, diemHoa: 8.5, diemCong: 0, tongDiem: 25.0, trangThai: 'TRÚNG TUYỂN', createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000004', maNganh: 'CNTT', diemToan: 9.0, diemLy: 9.0, diemHoa: 9.5, diemCong: 0, tongDiem: 27.5, trangThai: 'TRÚNG TUYỂN', createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000005', maNganh: 'ATTT', diemToan: 8.0, diemLy: 8.0, diemHoa: 8.5, diemCong: 0, tongDiem: 24.5, trangThai: 'TRÚNG TUYỂN', createdAt: currentTime, updatedAt: currentTime },
      { sbd: '00000006', maNganh: 'CNTT', diemToan: 9.5, diemLy: 9.0, diemHoa: 9.5, diemCong: 0, tongDiem: 28.0, trangThai: 'TRÚNG TUYỂN', createdAt: currentTime, updatedAt: currentTime }
    ], {});

    // 3. Tạo Hồ sơ nhập học
    await queryInterface.bulkInsert('HoSoNhapHoc', [
      { maHoSo: 101, sbd: '00000002', nguoiDuyet: 1, trangThai: 'PENDING', ngayNop: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { maHoSo: 102, sbd: '00000003', nguoiDuyet: 1, trangThai: 'PENDING', ngayNop: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { maHoSo: 103, sbd: '00000004', nguoiDuyet: 1, trangThai: 'PENDING', ngayNop: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { maHoSo: 104, sbd: '00000005', nguoiDuyet: 1, trangThai: 'PENDING', ngayNop: currentTime, createdAt: currentTime, updatedAt: currentTime },
      { maHoSo: 105, sbd: '00000006', nguoiDuyet: 1, trangThai: 'PENDING', ngayNop: currentTime, createdAt: currentTime, updatedAt: currentTime }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HoSoNhapHoc', null, {});
    await queryInterface.bulkDelete('KetQuaXetTuyen', null, {});
    await queryInterface.bulkDelete('ThiSinh', null, {});
  }
};