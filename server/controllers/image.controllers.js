const imageService = require('../services/image.service');
const {setNewAvatar} = require("../services/auth.service");
const {removeImage} = require("../services/image.service");
exports.getImage = async (req, res) => {
    try {
        let response = await imageService.getImage(req);
        if (response.error === 0) {
            return res.sendFile(response.data);
        }
        return res.status(401).send(response.data);
    } catch (error) {

        return res.status(500).send("Internal error");
    }
}

exports.uploadImage = async (req, res) => {
    try {
        let reponse = await imageService.uploadImage(req);
        if (reponse.error === 0) {
            return res.status(200).send(reponse.data);
        } else {
            return res.status(401).send(reponse.data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal error");
    }
}


exports.deleteImage = async (req, res) => {
    try {
        let filename = req.params.filename;
        let reponse = await imageService.removeImage(filename);
        if (reponse.error === 0) {
            return res.status(200).send(reponse.data);
        } else {
            return res.status(401).send(reponse.data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal error");
    }
}



exports.uploadAvatar = async (req, res) => {
    try {
            let reponse = await setNewAvatar(req.user, req.file.filename);
            if (reponse) {
                await removeImage(reponse)
                return res.status(200).json(req.file.filename);
            } else {
                return res.status(401).send("Internal error");
            }

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal error");
    }
}

