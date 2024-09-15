const { v2: cloudinary } = require("cloudinary");

// Configuration

cloudinary.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api_Key,
  api_secret: process.env.Cloudinary_Api_Secret,
});

const uploadCloudinary = async (path, next) => {
  try {
    //uploading file
    const uploadResult = await cloudinary.uploader.upload(path, {
      folder: "avatar",
    });

    return uploadResult;
  } catch (err) {
    next(err);
  }
};

module.exports = uploadCloudinary;
