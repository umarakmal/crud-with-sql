const express = require("express");

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllTests,
    Jointest,
    uploadData,
    getReport,
} = require("../controllers/controller.index");
const { upload } = require("../controllers/upload");
const router = express.Router();

router.get('/', getAllUsers);
router.get('/join', Jointest);
router.get('/test', getAllTests);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/upload-data', upload.single('uploadFile'), uploadData);
router.post('/get-report', getReport);
module.exports = router;