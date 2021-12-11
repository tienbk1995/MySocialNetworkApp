const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Connect mongo db
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Get entry
// app.get("/", (req, res) => {
//   res.send("API running");
// });

// Define route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets and production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Setting PORT
const PORT = process.env.PORT || 5000;

// Listen on PORT
app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT} `);
});
