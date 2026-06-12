const express = require("express");
const multer = require("multer");

const {
  previewExcel,
  importExcel,
} = require("../controllers/excel.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/preview",
  upload.single("file"),
  previewExcel
);

router.post(
  "/import",
  importExcel
);

module.exports = router;