const express = require('express');
const imageController = require('../controllers/image.controllers');
const multerMiddleware = require('../middlewares/multer-config');
const {authenticateToken} = require("../middlewares/auth.middleware");
var router = express.Router();



router.get('/:filename',  imageController.getImage)
router.delete('/:filename', imageController.deleteImage)
router.post('/',authenticateToken,  multerMiddleware.single('upload'), imageController.uploadAvatar)





module.exports = router;