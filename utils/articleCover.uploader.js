const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "articles", "covers"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + Math.random() * 1000 + file.originalname;
        const ext = path.extname(file.originalname);

        const validFormats = [".jpg", ".jpeg", ".png", ".webp"];
        if (!validFormats.includes(ext)) return cb(new Error("Invalid image format"));

        cb(null, fileName + ext);
    },
});

const coverUploader = multer({
    storage,
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
});

module.exports = coverUploader;