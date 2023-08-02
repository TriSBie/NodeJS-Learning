const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

// app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.listen(port, (err) => {
  console.log(`Server running on port ${port}`);
});
