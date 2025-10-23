const multer = require("multer")

const storage = multer.memoryStorage()

const uploade = multer({ storage});

module.exports = uploade;
