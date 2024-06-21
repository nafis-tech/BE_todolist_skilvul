const express = require("express");
const app = express();
const port = 127;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server sembada running");
});
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  // tambahkan domain frontend lainnya di sini
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Akses ditolak oleh kebijakan CORS"));
    }
  },
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// router
const usersRouter = require("./src/router/user");
const produkRouter = require("./src/router/produk");
const todoList = require("./src/router/todo");

// router path
app.use("/users", usersRouter);
app.use("/produk", produkRouter);

app.use("/todo_list", todoList);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
