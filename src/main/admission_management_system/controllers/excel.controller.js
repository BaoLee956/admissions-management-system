"use strict";

const XLSX = require("xlsx");
const db = require("../models");

const ThiSinh = db.ThiSinh;
const excelService = require("../services/excel.service");
const {
  previewExcelChiTietDiem,
  importChiTietDiem,
} = require("../services/excel.service");


const previewDiem = async (
  req,
  res
) => {
  try {
    const data =
      await previewExcelChiTietDiem(
        req.file.buffer
      );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const importDiem = async (
  req,
  res
) => {
  try {
    const result =
      await importChiTietDiem(
        req.body.data
      );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ===============================
// Tạo SBD 8 số
// ===============================
const generateSBD = () => {
    return Math.floor(
        10000000 + Math.random() * 90000000
    ).toString();
};

// ===============================
// Format ngày hiển thị
// ===============================
const formatExcelDate = (value) => {

    if (!value) return "";

    if (typeof value === "number") {

        const date =
            XLSX.SSF.parse_date_code(value);

        return `${String(date.d).padStart(2, "0")}/${String(date.m).padStart(2, "0")}/${date.y}`;
    }

    return value;
};

// ===============================
// Convert ngày lưu DB
// ===============================
const convertDateToDB = (value) => {

    if (!value) return null;

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

// ===============================
// PREVIEW EXCEL
// ===============================
const previewExcel = async (
  req,
  res
) => {
  try {
    const type =
      req.body.type ||
      req.query.type ||
      req.headers.type;

    let data;

    if (type === "diem") {
      data =
        await excelService.previewExcelChiTietDiem(
          req.file.buffer
        );
    } else {
      data =
        await excelService.previewExcel(
          req.file.buffer
        );
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// IMPORT DATABASE
// ===============================
const importExcel = async (
  req,
  res
) => {
  try {
    const { type, data } =
      req.body;

    let result;

    if (type === "diem") {
      result =
        await excelService.importChiTietDiem(
          data
        );
    } else {
      result =
        await excelService.importExcel(
          data
        );
    }

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {

    previewExcel,

    importExcel

};


module.exports = {
  previewExcel,
  importExcel,

  previewDiem,
  importDiem,
};