const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "courses", "videos"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + Math.random() * 1000 + file.originalname;
        const ext = path.extname(file.originalname);

        const validFormats = [".mp4"];
        if (!validFormats.includes(ext)) return cb(new Error("Invalid video format"));

        cb(null, fileName + ext);
    },
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 500 * 1024 * 1024,
    },
});

module.exports = uploader;