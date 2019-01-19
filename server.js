require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const db = require("./db/mongoose.connection");

const authRouter = require("./routes/api/auth.router");
const userRouter = require("./routes/api/user.router");

const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const { NODE_ENV, API_PORT, API_HOST } = process.env;

const app = express();
app.use(morgan("dev"));

// Test routing
app.get("/api", (req, res) => {
  res.status(200).json({ express: "Hello From Express" });
});

// Actual routing
app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Central error handling
app.use((err, req, res, next) => {
  console.error(err);
  if (NODE_ENV === "production")
    res.status(500).json({ error: "Internal server error" });
  else res.status(500).json({ error: err.message, stack: err.stack });
});

// When no routes were matched
app.use("*", (req, res) => {
  res.status(404).json({ [req.url]: "Not found" });
});

// Connect to MongoDB
db.connect();

// Start the express api server
app.listen(API_PORT, API_HOST, error => {
  if (error) console.error(error);
  else console.log(`Server running on ${API_HOST}:${API_PORT}`);
});
