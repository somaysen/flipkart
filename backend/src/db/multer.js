import multer from "multer";

// Use memory storage or disk storage
const storage = multer.memoryStorage();

// Initialize multer
const upload = multer({ storage });

// ✅ Export the multer instance (NOT upload.single / upload.array)
export default upload;
