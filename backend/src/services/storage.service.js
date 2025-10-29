const ImageKit = require("imagekit"); // ✅ Correct import

const storageInstance = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
});

const sendFilesToStorage = async (file, fileName) => {
  try {
    const response = await storageInstance.upload({
      file, // Base64 or binary
      fileName,
      folder: "Flipkart",
    });

    return response; // ✅ Returns uploaded file details
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error("Failed to upload to ImageKit");
  }
};

module.exports = sendFilesToStorage;
