"use strict";

const XLSX = require("xlsx");
const db = require("../models");
const ChiTietDiem = db.ChiTietDiem;
const MonHoc = db.MonHoc;
const ThiSinh = db.ThiSinh;


const mappingChiTietDiem = (row) => {
  return {
    cccd: String(row["CCCD"] || "").trim(),
    maMon: Number(
      row["MaMon"] ||
      row["Mã môn"] ||
      0
    ),
    diemSo: Number(
      row["Điểm"] ||
      row["Điểm số"] ||
      0
    ),
  };
};

const previewExcelChiTietDiem = async (
  buffer
) => {
  const rows = await readExcel(buffer);

  return rows.map(mappingChiTietDiem);
};

const importChiTietDiem = async (data) => {
  let inserted = [];
  let skipped = [];

  for (let i = 0; i < data.length; i++) {
    try {
      const item = data[i];

      // tìm thí sinh bằng CCCD
      const thiSinh = await ThiSinh.findOne({
        where: {
          cccd: item.cccd,
        },
      });

      if (!thiSinh) {
        skipped.push({
          row: i + 1,
          reason: "Không tìm thấy thí sinh",
        });
        continue;
      }

      const sbd = thiSinh.sbd;

      // kiểm tra môn học
      const monHoc = await MonHoc.findByPk(item.maMon);

      if (!monHoc) {
        skipped.push({
          row: i + 1,
          reason: "Không tồn tại môn học",
        });
        continue;
      }

      // kiểm tra điểm
      if (item.diemSo < 0 || item.diemSo > 10) {
        skipped.push({
          row: i + 1,
          reason: "Điểm phải từ 0 đến 10",
        });
        continue;
      }

      // kiểm tra trùng
      const exists = await ChiTietDiem.findOne({
        where: {
          sbd,
          maMon: item.maMon,
        },
      });

      if (exists) {
        skipped.push({
          row: i + 1,
          reason: "Điểm môn đã tồn tại",
        });
        continue;
      }

      const created = await ChiTietDiem.create({
        sbd,
        maMon: item.maMon,
        diemSo: item.diemSo,
      });

      inserted.push(created.toJSON());

    } catch (error) {
      skipped.push({
        row: i + 1,
        reason: error.message,
      });
    }
  }

  return {
    inserted: inserted.length,
    skipped: skipped.length,
    data: inserted,
    errors: skipped,
  };
};
// =====================================
// Chuyển ngày Excel -> Date
// =====================================
const convertExcelDate = (value) => {
  if (!value) return null;

  if (typeof value === "number") {
    const date = XLSX.SSF.parse_date_code(value);

    return new Date(
      date.y,
      date.m - 1,
      date.d
    );
  }

  if (typeof value === "string") {
    const parts = value.split("/");

    if (parts.length === 3) {
      return new Date(
        Number(parts[2]),
        Number(parts[1]) - 1,
        Number(parts[0])
      );
    }
  }

  return new Date(value);
};

// =====================================
// Format ngày hiển thị Preview
// =====================================
const formatDatePreview = (value) => {
  if (!value) return "";

  if (typeof value === "number") {
    const date = XLSX.SSF.parse_date_code(value);

    return `${String(date.d).padStart(2, "0")}/${String(
      date.m
    ).padStart(2, "0")}/${date.y}`;
  }

  return value;
};

// =====================================
// Sinh SBD 8 số
// =====================================
const generateSBD = () => {
  return Math.floor(
    10000000 + Math.random() * 90000000
  ).toString();
};

// =====================================
// Đọc file Excel
// =====================================
const readExcel = async (buffer) => {
  const workbook = XLSX.read(buffer, {
    type: "buffer",
  });

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  return XLSX.utils.sheet_to_json(
    sheet,
    {
      defval: "",
      raw: true,
    }
  );
};

// =====================================
// Mapping dữ liệu
// =====================================
const mappingThiSinh = (row) => {
  return {
    hoTen:
      row["Họ tên"] || "",

    ngaySinh:
      formatDatePreview(
        row["Ngày sinh"]
      ),

    gioiTinh:
      row["Giới tính"] || "",

    sdt: String(
      row["Số điện thoại"] || ""
    ),

    cccd: String(
      row["CCCD"] || ""
    ),

    email:
      row["Email"] || "",

    diaChi:
      row["Địa chỉ"] || "",

    khuVuc:
      row["Khu vực"] || "",

    doiTuongUuTien:
      row["Đối tượng ưu tiên"] ||
      "Không",
  };
};

// =====================================
// Preview Excel
// =====================================
const previewExcel = async (
  buffer
) => {
  const rows = await readExcel(
    buffer
  );

  return rows.map(
    mappingThiSinh
  );
};

// =====================================
// Import Database
// =====================================
const importExcel = async (
  data
) => {
  let inserted = [];
  let skipped = [];

  for (
    let i = 0;
    i < data.length;
    i++
  ) {
    try {
      const item = data[i];

      const cccd = String(
        item.cccd
      ).trim();

      const sdt = String(
        item.sdt
      ).trim();

      // CCCD 12 số
      if (
        !/^\d{12}$/.test(cccd)
      ) {
        skipped.push({
          row: i + 1,
          reason:
            "CCCD phải gồm 12 số",
        });
        continue;
      }

      // SĐT 10 số
      if (
        !/^\d{10}$/.test(sdt)
      ) {
        skipped.push({
          row: i + 1,
          reason:
            "Số điện thoại phải gồm 10 số",
        });
        continue;
      }

      const exists =
        await ThiSinh.findOne({
          where: {
            cccd,
          },
        });

      if (exists) {
        skipped.push({
          row: i + 1,
          cccd,
          reason:
            "CCCD đã tồn tại",
        });

        continue;
      }

      const created =
        await ThiSinh.create({
          sbd: generateSBD(),

          hoTen: item.hoTen,

          ngaySinh:
            convertExcelDate(
              item.ngaySinh
            ),

          gioiTinh:
            String(
              item.gioiTinh
            )
              .trim()
              .toLowerCase() ===
            "nam",

          sdt,

          cccd,

          email:
            item.email,

          diaChi:
            item.diaChi,

          khuVuc:
            item.khuVuc,

          doiTuongUuTien:
            item.doiTuongUuTien,

          otp_code:
            "123456",

          otp_expires:
            new Date(
              Date.now() +
                5 *
                  60 *
                  1000
            ),
        });

      inserted.push(
        created.toJSON()
      );
    } catch (error) {
      skipped.push({
        row: i + 1,
        reason:
          error.message,
      });
    }
  }

  return {
    inserted:
      inserted.length,

    skipped:
      skipped.length,

    data: inserted,

    errors: skipped,
  };
};



module.exports = {
  readExcel,

  previewExcel,
  importExcel,

  previewExcelChiTietDiem,
  importChiTietDiem,

  mappingThiSinh,
};