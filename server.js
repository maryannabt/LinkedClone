const express = require("express");
const morgan = require("morgan");
const path = require('path');

const db = require("./db/mongoose.connection");

const authRouter = require("./routes/api/auth.router");
const userRouter = require("./routes/api/user.router");

const app = express();
app.use(morgan("dev"));

app.use(express.static(path.join("client", "build")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// When no routes were matched
// app.use("*", (req, res) => {
//   res.status(404).json({ [req.url]: "Not found" });
// });

// Central error handling
app.use((err, req, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === "production")
    res.status(500).json({ error: "Internal server error" });
  else res.status(500).json({ error: err.message, stack: err.stack });
});

// Connect to MongoDB
db.connect();

const PORT = process.env.PORT || 3030;

// Start the express api server
app.listen(PORT, error => {
  if (error) console.error(error);
  else console.log(`Server running on port ${PORT}`);
});
