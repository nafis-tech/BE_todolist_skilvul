const express = require("express");
const router = express.Router();
const Controller = require("../controller/produkC");
const { auth } = require("../middleware/auth");

// router pinjaman
router.post("/pinjaman", Controller.createDataPinjaman);
router.get("/pinjaman", auth, Controller.getAllDataPijaman);
router.delete("/pinjaman", Controller.deleteDataPinjaman);
router.post(
  "/pinjaman/updatePinjaman",
  auth,
  Controller.updateKatogoriPinjaman
);

// router simpanan
router.post("/simpanan", Controller.createDataSimpanan);
router.get("/simpanan", auth, Controller.getAlldataSimpanan);
router.post(
  "/simpanan/updateSimpanan",
  auth,
  Controller.updateKategoriSimpanan
);
router.delete("/simpanan", Controller.deleteDataSimpanan);

// router kemitraan
router.post("/kemitraan", Controller.creatDataKemitraan);
router.get("/kemitraan", auth, Controller.getAllDataKemitraan);
router.delete("/kemitraan", Controller.deleteDataKemitraan);
router.post(
  "/kemitraan/updateKemitraan",
  auth,
  Controller.updateKategoriKemitraan
);

// router SDB
router.post("/SDB", Controller.creatDataSDB);
router.get("/SDB", auth, Controller.getAllDataSDB);
router.delete("/SDB", Controller.deleteDataSDB);
router.post("/SDB/updateSDB", auth, Controller.updateKategoriSDB);

// router pengaduan nasabah
router.post("/pengaduan", Controller.createDataPengaduan);
router.get("/pengaduan", auth, Controller.getALLDataPengaduan);
router.delete("/pengaduan", Controller.deleteDataPengaduan);
router.post(
  "/pengaduan/updatePengaduan",
  auth,
  Controller.updateKategoriPengaduan
);

module.exports = router;
