require("dotenv").config({ path: "./.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const UserRouter = require("./routes/user.router.js");
const PostRouter = require("./routes/post.router.js");
const FollowRouter = require("./routes/follow.router.js");
const commentRouter = require("./routes/comment.router.js");
const likeRouter = require("./routes/like.router.js");
const historyRouter = require("./routes/history.router.js");

const connectDB = require("./config/db.js");
const multer = require("multer");

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());

server.use(
  session({
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to `true` if using HTTPS
      httpOnly: true, // Prevents client-side access to the cookie
      maxAge: 60000 * 5, // 5 minute
      // sameSite: "lax", // Controls cross-site cookie sending
    },
  })
);

const port = process.env.PORT || 4040;

//router
server.use("/api/v1", UserRouter);
server.use("/api/v1", PostRouter);
server.use("/api/v1", FollowRouter);
server.use("/api/v1", commentRouter);
server.use("/api/v1", likeRouter);
server.use("/api/v1", historyRouter);

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
