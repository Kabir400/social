const express = require("express");
require("dotenv").config({ path: "./.env" });

const connectDB = require("./config/db.js");

const server = express();

const port = process.env.PORT || 4040;

//..............................................................
//error middleware
server.use((err, _, res) => {
  //variables
  err.status = err.status || 500;
  err.message = err.message || "Something went wrong";
  err.success = err.success || false;
  err.data = err.data || null;

  //sending response to the client
  res.status(err.status).json({
    message: err.message,
    success: err.success,
    data: err.data,
    status: err.status,
  });
});

// ..........................................................

//databse connection
connectDB()
  .then(() => {
    //checking for error
    server.on("error", (err) => {
      console.log(`Error: ${err}`);
      process.exit(1);
    });

    //listning to the server
    server.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection failed: ${err}`);
  });
//...........................................................
