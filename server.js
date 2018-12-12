require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const db = require("./db/mongoose.connection");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const { NODE_ENV, API_PORT, API_HOST } = process.env;

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World"));

db.connect();

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(API_PORT, API_HOST, error => {
  if (error) console.error(error);
  else console.log(`Server running on ${API_HOST}:${API_PORT}`);
});
