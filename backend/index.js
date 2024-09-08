require("dotenv").config({ path: "./.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const UserRouter = require("./routes/user.router.js");
const PostRouter = require("./routes/post.router.js");

const connectDB = require("./config/db.js");
const multer = require("multer");

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use(
  session({
    secret: "your-secret-key", // Used to sign the session ID cookie
    resave: false, // Prevents session from being saved back to the session store unless modified
    saveUninitialized: false, // Prevents uninitialized sessions from being saved
    cookie: { secure: false }, // Use 'true' if you're using HTTPS
  })
);

const port = process.env.PORT || 4040;

//router
server.use("/api/v1", UserRouter);
server.use("/api/v1", PostRouter);

//..............................................................
//error middleware
server.use((err, req, res, next) => {
  //variables
  err.status = err.status || 500;
  err.success = err.success || false;
  err.data = err.data || null;

  if (err instanceof multer.MulterError) {
    err.message = "File upload error";
  } else {
    err.message = err.message || "Something went wrong";
  }

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
