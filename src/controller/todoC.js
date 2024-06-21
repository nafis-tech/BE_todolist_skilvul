const db = require("../../connections");
const response = require("../../response");

const createNewTodo = (req, res) => {
  const { title, description, complete, des_complete, date } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO userstodo (id, title, description, complete, des_complete, date) VALUES (NULL, '${title}', '${description}', '${complete}', '${des_complete}', '${date}')`;

  db.query(sql, (error, result) => {
    if (error) return response(500, "", "todo server error", res);
    if (result.affectedRows > 0) {
      return response(
        200,
        { isSuccess: true, id: result.insertId },
        "data todo inserted successfully",
        res
      );
    } else {
      return response(400, null, "Failed to insert data usertodo", res);
    }
  });
};

const getAllDataTodo = async (req, res) => {
  try {
    const sql = "SELECT * FROM userstodo";
    db.query(sql, (error, result) => {
      if (error) throw error;
      // Konversi nilai complete dari 0/1 ke false/true
      const formattedResult = result.map((row) => ({
        ...row,
        complete: row.complete === 1,
      }));
      response(200, formattedResult, "get all data from usertodo", res);
    });
  } catch (error) {}
};

const deleteDataTodo = (req, res) => {
  const { id } = req.body;
  console.log(req.body, "ini body");
  const sql = `DELETE FROM userstodo WHERE id = '${id}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Delete todo Invalid", "error", res);
    if (result.affectedRows > 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "DELETE data todo Success", res);
    } else {
      response(404, "DATA todo not found", "error", res);
    }
  });
};

const cekListTodo = (req, res) => {
  const { id, complete, date } = req.body;
  console.log(req.body);
  const sql = "UPDATE userstodo SET complete = ?, date = ? WHERE id = ?";

  db.query(sql, [complete, date, id], (error, result) => {
    if (error) {
      return response(200, "", "error", res);
    }

    response(200, result, "get all data from usertodo", res);
  });
};

module.exports = {
  createNewTodo,
  getAllDataTodo,
  deleteDataTodo,
  cekListTodo,
};
