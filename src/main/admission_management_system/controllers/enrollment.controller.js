'use strict';

const { HoSoNhapHoc, GiayToDinhKem, KetQuaXetTuyen, NhanVien, LoaiGiayTo } = require('../models');

/**
 * Nộp hồ sơ nhập học trực tuyến
 */
const submitDocuments = async (req, res) => {
  try {
    const sbd = req.user.sbd;

    // 1. Kiểm tra req.files có nhận đủ các file bắt buộc (cccd, hocBa, giayTotNghiep) không.
    if (!req.files || 
        !req.files.cccd || !req.files.cccd[0] ||
        !req.files.hocBa || !req.files.hocBa[0] ||
        !req.files.giayTotNghiep || !req.files.giayTotNghiep[0]) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng tải lên đầy đủ các tài liệu bắt buộc (Căn cước công dân, Học bạ, Giấy tốt nghiệp).',
      });
    }

    // 2. Tìm hoặc khởi tạo HoSoNhapHoc cho thí sinh
    let hoSo = await HoSoNhapHoc.findOne({ where: { sbd: sbd } });
    
    if (!hoSo) {
      // Tìm cán bộ (NhanVien) đầu tiên trong hệ thống để tự động phân công duyệt
      const officer = await NhanVien.findOne({ order: [['maNhanVien', 'ASC']] });
      if (!officer) {
        return res.status(500).json({
          success: false,
          message: 'Hệ thống chưa có Cán bộ hỗ trợ xử lý hồ sơ. Vui lòng liên hệ Admin.',
        });
      }

      hoSo = await HoSoNhapHoc.create({
        sbd: sbd,
        nguoiDuyet: officer.maNhanVien,
        trangThai: 'PENDING',
        ngayNop: new Date(),
      });
    }

    // 3. Định nghĩa mapping các trường upload sang tenLoai giấy tờ
    const docTypesConfig = {
      cccd: { tenLoai: 'Căn cước công dân', batBuoc: true },
      hocBa: { tenLoai: 'Học bạ', batBuoc: true },
      giayTotNghiep: { tenLoai: 'Giấy tốt nghiệp', batBuoc: true },
      minhChungUuTien: { tenLoai: 'Minh chứng ưu tiên', batBuoc: false },
    };

    // 4. Lưu từng tài liệu vào bảng GiayToDinhKem
    for (const fieldName of Object.keys(docTypesConfig)) {
      const fileList = req.files[fieldName];
      if (fileList && fileList[0]) {
        const file = fileList[0];
        const config = docTypesConfig[fieldName];

        // Tìm hoặc tạo loại giấy tờ tương ứng
        let docType = await LoaiGiayTo.findOne({ where: { tenLoai: config.tenLoai } });
        if (!docType) {
          docType = await LoaiGiayTo.create({
            tenLoai: config.tenLoai,
            batBuoc: config.batBuoc,
          });
        }

        const relativePath = file.path;

        // Lưu/Cập nhật thông tin file vào Database
        await GiayToDinhKem.upsert({
          maHoSo: hoSo.maHoSo,
          maLoai: docType.maLoai,
          duongDanFile: relativePath,
        });
      }
    }

    // 5. Cập nhật trạng thái trong bảng KetQuaXetTuyen thành "ĐÃ XÁC NHẬN NHẬP HỌC"
    await KetQuaXetTuyen.update(
      { trangThai: 'ĐÃ XÁC NHẬN NHẬP HỌC' },
      { where: { sbd: sbd } }
    );

    return res.status(200).json({
      success: true,
      message: 'Nộp hồ sơ nhập học và xác nhận nhập học trực tuyến thành công!',
    });
  } catch (error) {
    console.error('Error in submitDocuments:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi hệ thống trong quá trình nộp hồ sơ.',
      error: error.message,
    });
  }
};

module.exports = {
  submitDocuments,
};
