'use strict';

const { KetQuaXetTuyen, NganhHoc, ThiSinh } = require('../models');

/**
 * Tra cứu kết quả xét tuyển của thí sinh
 */
const getAdmissionResult = async (req, res) => {
  try {
    const sbd = req.user.sbd;

    const result = await KetQuaXetTuyen.findOne({
      where: { sbd: sbd },
      include: [
        {
          model: NganhHoc,
          as: 'nganhHoc',
          attributes: ['tenNganh', 'diemChuan'],
        },
        {
          model: ThiSinh,
          as: 'thiSinh',
          attributes: ['hoTen', 'cccd'],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        error: {
          code: 'RESULT_NOT_FOUND',
          message: 'Không tìm thấy kết quả xét tuyển cho thí sinh này',
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching admission result:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Đã xảy ra lỗi hệ thống khi tra cứu kết quả',
      },
    });
  }
};

module.exports = {
  getAdmissionResult,
};
