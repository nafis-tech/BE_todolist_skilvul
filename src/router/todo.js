const express = require("express");
const router = express.Router();
const Controller = require("../controller/todoC");

router.post("/todo", Controller.createNewTodo);
router.get("/todo", Controller.getAllDataTodo);
router.delete("/todo", Controller.deleteDataTodo);
router.patch("/todo", Controller.cekListTodo);

module.exports = router;
