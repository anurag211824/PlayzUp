import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Don't configure immediately - do it in a function
let isConfigured = false;

const configureCloudinary = () => {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    console.log("Cloudinary Config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing"
    });
    
    isConfigured = true;
  }
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Configure cloudinary when actually uploading (ensures env vars are loaded)
    configureCloudinary();

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", response.secure_url);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };