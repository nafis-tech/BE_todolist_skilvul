const db = require("../../connections");
const response = require("../../response");

// controller pinjaman
const createDataPinjaman = (req, res) => {
  const {
    date,
    nama_lengkap,
    jenis_pinjaman,
    no_telephone,
    email,
    provinsi,
    kota,
    pekerjaan,
    jenis_jaminan,
    sertifikat_atas_nama,
    rencana_pinjaman_dana,
    kategori,
  } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO pinjaman (id, date, nama_lengkap, jenis_pinjaman, no_telephone, email, provinsi, kota, pekerjaan, jenis_jaminan, sertifikat_atas_nama, rencana_pinjaman_dana, kategori) VALUES (NULL, '${date}', '${nama_lengkap}', '${jenis_pinjaman}', '${no_telephone}', '${email}', '${provinsi}', '${kota}', '${pekerjaan}', '${jenis_jaminan}', '${sertifikat_atas_nama}', '${rencana_pinjaman_dana}', '${kategori}')`;

  db.query(sql, (error, result) => {
    if (error) return response(500, "", "Pinjaman Server Error", res);
    if (result.affectedRows > 0) {
      return response(
        200,
        { isSuccess: true, id: result.insertId },
        "Data Pinjaman inserted successfully",
        res
      );
    } else {
      return response(400, null, "Failed to insert data Pinjaman", res);
    }
  });
};

const getAllDataPijaman = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const sql = "SELECT * FROM pinjaman";
      db.query(sql, (error, result) => {
        if (error) throw error;
        response(200, result, "get all data from pinjaman", res);
      });
    } else {
      response(400, "access denaid", "your account not admin", res);
    }
  } catch (error) {
    response(500, error, "Produk sever error", res);
  }
};

const deleteDataPinjaman = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM pinjaman WHERE id = '${id}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Delete pinjaman Invalid", "error", res);
    if (result.affectedRows > 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "DELETE data pinjaman Success", res);
    } else {
      response(404, "DATA Pinjaman not found", "error", res);
    }
  });
};
const updateKatogoriPinjaman = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { kategori, id } = req.body;
      console.log(req.body);
      const sql = `UPDATE pinjaman SET kategori = ? WHERE id = ?`;
      db.query(sql, [kategori, id], (error, result) => {
        console.log(result);
        if (error) {
          return response(500, error, "Fail update category", res);
        } else {
          return response(
            200,
            result,
            `Update kategori for pinjaman with id ${id}`,
            res
          );
        }
      });
    } else {
      response(400, "access denied", "Your account is not an admin", res);
    }
  } catch (error) {
    response(500, error, "Server error", res);
  }
};

// controller Simpanan
const createDataSimpanan = (req, res) => {
  const {
    date,
    jenis_simpanan,
    nama_lengkap,
    no_telephone,
    email,
    provinsi,
    kota,
    penempatan_dana,
    kategori,
  } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO simpanan (id, date, jenis_simpanan, nama_lengkap, no_telephone, email, provinsi, kota, penempatan_dana, kategori) VALUES (NULL, '${date}', '${jenis_simpanan}', '${nama_lengkap}', '${no_telephone}', '${email}', '${provinsi}', '${kota}', '${penempatan_dana}', '${kategori}')`;

  db.query(sql, (error, result) => {
    if (error) {
      return response(500, "", "Simpanan Server Error", res);
    }

    if (result.affectedRows > 0) {
      return response(
        200,
        { isSuccess: true, id: result.insertId },
        "Data Simpanan inserted successfully",
        res
      );
    } else {
      return response(400, null, "Failed to insert data Simpanan", res);
    }
  });
};

const getAlldataSimpanan = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const sql = "SELECT * FROM simpanan";
      db.query(sql, (error, result) => {
        if (error) throw error;
        response(200, result, "get all data form simpanan", res);
      });
    } else {
      response(400, "access denaid", "your account not admin", res);
    }
  } catch (error) {
    response(500, error, "Produk sever error", res);
  }
};
const updateKategoriSimpanan = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { kategori, id } = req.body;
      console.log(req.body);
      const sql = `UPDATE simpanan SET kategori = ? WHERE id = ?`;
      db.query(sql, [kategori, id], (error, result) => {
        console.log(result);
        if (error) {
          return response(500, "error", "Fail update category", res);
        } else {
          return response(
            200,
            result,
            `Updated kategori for simpanan with id ${id}`,
            res
          );
        }
      });
    } else {
      response(400, "access denied", "Your account is not an admin", res);
    }
  } catch (error) {
    response(500, error, "Server error", res);
  }
};

const deleteDataSimpanan = (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const sql = `DELETE FROM simpanan WHERE id = '${id}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Delete Simpanan Invalid", "error", res);
    if (result.affectedRows > 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "DELETE data simpanan Success", res);
    } else {
      response(404, "DATA Simpanan not found", "error", res);
    }
  });
};

// kemitraan controller
const creatDataKemitraan = (req, res) => {
  const { date, nama_lengkap, no_telephone, email, organisasi, form_masukan } =
    req.body;

  const sql = `INSERT INTO kemitraan (id, date, nama_lengkap, no_telephone, email, organisasi, form_masukan) VALUES (NULL, '${date}', '${nama_lengkap}', '${no_telephone}', '${email}', '${organisasi}', '${form_masukan}')`;

  db.query(sql, (error, result) => {
    if (error) return response(500, "", "Kemitraan Server Error", res);
    if (result.affectedRows > 0) {
      return response(
        200,
        { isSuccess: true, id: result.insertId },
        "Data Kemitraan inserted successfully",
        res
      );
    } else {
      return response(400, null, "Failed to insert data Kemitraan", res);
    }
  });
};

const getAllDataKemitraan = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const sql = "SELECT * FROM kemitraan";
      db.query(sql, (error, result) => {
        if (error) throw error;
        response(200, result, "get all data from Kemitraan", res);
      });
    } else {
      response(400, "access denaid", "your account not admin", res);
    }
  } catch (error) {
    response(500, error, "Produk sever error", res);
  }
};

const deleteDataKemitraan = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM kemitraan WHERE id = '${id}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Delete Kemitraan Invalid", "error", res);
    if (result.affectedRows > 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "DELETE data kemitraan Success", res);
    } else {
      response(404, "DATA kemitraan not found", "error", res);
    }
  });
};

const updateKategoriKemitraan = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { kategori, id } = req.body;
      console.log(req.body);
      const sql = `UPDATE kemitraan SET kategori = ? WHERE id = ?`;
      db.query(sql, [kategori, id], (error, result) => {
        console.log(result);
        if (error) {
          return response(500, "error", "Fail update category", res);
        } else {
          return response(
            200,
            result,
            `Updated kategori for kemitraan with id ${id}`,
            res
          );
        }
      });
    } else {
      response(400, "access denied", "Your account is not an admin", res);
    }
  } catch (error) {
    response(500, error, "Server error", res);
  }
};

//  SDB controller
const creatDataSDB = (req, res) => {
  const {
    date,
    ukuran_sdb,
    nama_lengkap,
    no_telephone,
    email,
    provinsi,
    kota,
    kategori,
  } = req.body;

  const sql = `INSERT INTO sdb (id, date, ukuran_sdb, nama_lengkap, no_telephone, email, provinsi, kota, kategori ) VALUES (NULL, '${date}', '${ukuran_sdb}', '${nama_lengkap}', '${no_telephone}', '${email}', '${provinsi}', '${kota}', '${kategori}')`;

  db.query(sql, (error, result) => {
    if (error) return response(500, "", "SDB Server Error", res);
    if (result) {
      return response(
        200,
        { isSuccess: true, id: result.insertId },
        "Data SDB inserted successfully",
        res
      );
    } else {
      return response(400, null, "Failed to insert data SDB", res);
    }
  });
};

const getAllDataSDB = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const sql = "SELECT * FROM sdb";
      db.query(sql, (error, result) => {
        if (error) throw error;
        response(200, result, "get all data from SDB", res);
      });
    } else {
      response(400, "access denaid", "your account not admin", res);
    }
  } catch (error) {
    response(500, error, "Produk sever error", res);
  }
};

const deleteDataSDB = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM sdb WHERE id = '${id}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Delete SDB Invalid", "error", res);
    if (result.affectedRows > 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "DELETE data SDB Success", res);
    } else {
      response(404, "DATA SDB not found", "error", res);
    }
  });
};
const updateKategoriSDB = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { kategori, id } = req.body;
      console.log(req.body);
      const sql = `UPDATE sdb SET kategori = ? WHERE id = ?`;
      db.query(sql, [kategori, id], (error, result) => {
        if (error) {
          return response(500, "error", "Fail update category", res);
        } else {
          return response(
            200,
            result,
            `Updated kategori for SDB with id ${id}`,
            res
          );
        }
      });
    } else {
      response(400, "access denied", "Your account is not an admin", res);
    }
  } catch (error) {
    response(500, error, "Server error", res);
  }
};

// controller pengaduan nasabah
const createDataPengaduan = (req, res) => {
  const { date, nama_lengkap, no_telephone, email, pengaduan } = req.body;
  const sql = `INSERT INTO pengaduan (date, nama_lengkap, no_telephone, email, pengaduan) VALUES ('${date}', '${nama_lengkap}', '${no_telephone}', '${email}', '${pengaduan}')`;

  db.query(sql, (error, result) => {
    if (error) {
      return response(500, "", "Pengaduan server error", res);
    } else if (result.affectedRows > 0) {
      return response(
        200,
        { isSuccess: true, id: result.insertId },
        "Data pengaduan isnserder successfully",
        res
      );
    }
  });
};

const getALLDataPengaduan = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const sql = "SELECT * FROM pengaduan";
      db.query(sql, (error, result) => {
        if (error) throw error;
        response(200, result, "get all data from users", res);
      });
    } else {
      response(400, "access denaid", "your account not admin", res);
    }
  } catch (error) {
    response(500, error, "Produk sever error", res);
  }
};

const deleteDataPengaduan = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM pengaduan WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Delete pengaduan invalid", "error", res);
    if (result.affectedRows > 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "DELETE data pengaduan success", res);
    } else {
      response(404, "Data pengaduan not found", "error", res);
    }
  });
};

const updateKategoriPengaduan = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { kategori, id } = req.body;
      console.log(req.body);
      const sql = `UPDATE pengaduan SET kategori = ? WHERE id = ?`;
      db.query(sql, [kategori, id], (error, result) => {
        console.log(result);
        if (error) {
          return response(500, "error", "Fail update category", res);
        } else {
          return response(
            200,
            result,
            `Updated kategori for pengaduan with id ${id}`,
            res
          );
        }
      });
    } else {
      response(400, "access denied", "Your account is not an admin", res);
    }
  } catch (error) {
    response(500, error, "Server error", res);
  }
};

module.exports = {
  createDataPinjaman,
  getAllDataPijaman,
  deleteDataPinjaman,
  updateKatogoriPinjaman,
  getAlldataSimpanan,
  createDataSimpanan,
  deleteDataSimpanan,
  updateKategoriSimpanan,
  creatDataKemitraan,
  getAllDataKemitraan,
  deleteDataKemitraan,
  updateKategoriKemitraan,
  creatDataSDB,
  getAllDataSDB,
  deleteDataSDB,
  updateKategoriSDB,
  getALLDataPengaduan,
  createDataPengaduan,
  deleteDataPengaduan,
  updateKategoriPengaduan,
};
