const express = require('express');
const imageController = require('../controllers/image.controllers');
var router = express.Router();

router.get('/:filename', imageController.getImage)
router.delete('/:filename', imageController.deleteImage)
router.post('/', imageController.uploadImage)





module.exports = router;