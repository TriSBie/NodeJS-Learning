const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");

/**When we want to receive the content from the incoming request -> using express.json*/

dbConnection();
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// console.log(Date.now() / 1000); -- get the current millseconds with the second at last ultil 1970

/**Middleware error handler */
app.use(errorHandler);

app.listen(port, (err) => {
  console.log(`Server running on port ${port}`);
});
