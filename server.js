const express = require("express");
const morgan = require("morgan");

const db = require("./db/mongoose.connection");

const authRouter = require("./routes/api/auth.router");
const userRouter = require("./routes/api/user.router");

const app = express();
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Central error handling
app.use((err, req, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === "production")
    res.status(500).json({ error: "Internal server error" });
  else res.status(500).json({ error: err.message, stack: err.stack });
});

// When no routes were matched
app.use("*", (req, res) => {
  res.status(404).json({ [req.url]: "Not found" });
});

// Connect to MongoDB
db.connect();

const PORT = process.env.PORT || 3030;

// Start the express api server
app.listen(PORT, error => {
  if (error) console.error(error);
  else console.log(`Server running on port ${PORT}`);
});
