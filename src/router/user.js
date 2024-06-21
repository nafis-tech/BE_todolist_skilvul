const express = require("express");
const router = express.Router();
const {
  registrasi,
  getUsers,
  login,
  logout,
  keepLogin,
  updateProfilePicture,
} = require("../controller/userC");
const { profileImg } = require("../middleware/uploads_profilesdm");
const { auth } = require("../middleware/auth");

router.post("/regist", registrasi);
router.post("/login", login);
router.post("/keepLogin", keepLogin);
router.post("/logout", logout);
router.get("/", auth, getUsers);
router.post(
  "/update_profile",
  auth,
  profileImg("picture"),
  updateProfilePicture
);

module.exports = router;
