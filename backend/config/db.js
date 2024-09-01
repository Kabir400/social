const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );

    console.log(`\n Database connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("\n Database connection failed ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
