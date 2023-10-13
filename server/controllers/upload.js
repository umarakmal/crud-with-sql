const multer = require("multer");
var path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype == "text/csv") {
            cb(null, true);
        } else {
            cb(null, false);
            req.formaterror = "Only .csv format allowed";
            return cb(null, "Only .csv allowed");
        }
    },
});