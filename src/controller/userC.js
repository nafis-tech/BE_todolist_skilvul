const db = require("../../connections");
const response = require("../../response");
require("dotenv").config();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const secret = process.env.SECRET;

const registrasi = (req, res) => {
  const { username, email, password, role, token, tanggal_daftar } = req.body;
  console.log(req.body);

  // Generate salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return response(500, "", "Error generating salt!", res);
    }

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        return response(500, "", "Error hashing password!", res);
      }

      const sql = `SELECT email FROM users WHERE email = '${email}'`;

      db.query(sql, (error, result) => {
        if (error) {
          return response(500, "", "Users server error!", res);
        } else if (result.length > 0) {
          return response(500, "", "Your account has been registered!", res);
        } else {
          const insertSql = `INSERT INTO users (username, email, password, role, token, tanggal_daftar) VALUES ('${username}','${email}', '${hashedPassword}','${role}','${token}', '${tanggal_daftar}')`;

          db.query(insertSql, (error, result) => {
            if (error) {
              return response(500, error, "Register user unsuccessful!", res);
            } else if (result.affectedRows > 0) {
              return response(
                200,
                { isRegist: result.affectedRows },
                "Register user successful!",
                res
              );
            }
          });
        }
      });
    });
  });
};
// naruto@gmail.com
// Naruto123

const getUsers = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const sql = "SELECT * FROM users";
      db.query(sql, (error, result) => {
        console.log(error);
        if (error) {
          return response(500, "error", "User sever error", res);
        } else response(200, result, "Get all data from users", res);
      });
    } else {
      response(400, "access denaid", "your account not admin", res);
    }
  } catch (error) {
    response(500, error, "User sever error", res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const sql = `SELECT * FROM users WHERE email ='${email}'`;
    db.query(sql, async (error, result) => {
      if (error) {
        return response(500, "error", "User sever error", res);
      } else if (result.length === 0) {
        return response(
          400,
          "unvalid account",
          "this account dosent exist",
          res
        );
      } else {
        const isMacth = await bcrypt.compare(password, result[0].password);
        console.log(isMacth, "ini match");
        if (isMacth) {
          const dataToken = {
            id: result[0].id,
            email: result[0].email,
            role: result[0].role,
          };
          const dataResponseLogin = {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            role: result[0].role,
          };
          const token = JWT.sign(dataToken, secret, {
            expiresIn: 60 * 60 * 24 * 2,
          });
          const sql = `UPDATE users SET token = '${token}' WHERE id = ${result[0].id};`;

          db.query(sql, (error, result) => {
            if (error) {
              return response(500, "error", "User sever error", res);
            } else {
              const payload = {
                token,
                dataResponseLogin,
              };
              return response(200, payload, "Login user success", res);
            }
          });
        } else {
          return response(
            500,
            "error",
            "your email or password not valid",
            res
          );
        }
      }
    });
  } catch (error) {
    response(400, error, "User server error", res);
  }
};

const logout = async (req, res) => {
  try {
    const { email } = req.body;

    const sql = `UPDATE users SET token = "" WHERE email = '${email}'`;
    db.query(sql, (error, result) => {
      if (error) {
        return response(500, "error", "User sever error", res);
      } else {
        return response(200, "Success", "Logout user success", res);
      }
    });
  } catch (error) {
    response(400, error, "User server error", res);
  }
};

const keepLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const sql = `SELECT * FROM users WHERE token ='${token}'`;
    db.query(sql, (error, result) => {
      if (error) {
        return response(500, null, "User server error", res);
      } else if (result.length === 0) {
        return response(400, null, "Token expired, please relogin!", res);
      } else {
        const dataResponseLogin = {
          id: result[0].id,
          username: result[0].username,
          email: result[0].email,
          role: result[0].role,
        };
        const payload = {
          token,
          dataResponseLogin,
        };
        return response(200, payload, "Re-Login user success", res);
      }
    });
  } catch (error) {
    response(400, null, "User server error", res);
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.body;
    const picture = req.file.filename;
    const sql = `UPDATE users SET picture = ? WHERE id = ?`;
    db.query(sql, [picture, id], (error, result) => {
      if (error) {
        return response(500, "error", "Fail update picture", res);
      } else {
        return response(
          200,
          result,
          `Updated picture for user with id ${id}`,
          res
        );
      }
    });
  } catch (error) {
    response(400, error, "User server error", res);
  }
};

module.exports = {
  registrasi,
  getUsers,
  login,
  logout,
  keepLogin,
  updateProfilePicture,
};
