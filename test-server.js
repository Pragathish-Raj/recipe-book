const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(5000, () => {
  console.log("Test server running on port 5000");
});
