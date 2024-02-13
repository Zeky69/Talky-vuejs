const fs = require('fs');
const path = require('path');

const getImage = async (req, res) => {
    try {
        //envoyer le fichier si il existe
         const filename = req.params.filename;
         const file = path.join(__dirname, '../upload', filename);
         if (!fs.existsSync(file)) {
             return { error: 0 , data: path.join(__dirname, '../upload', 'default.png') };
            }
         return {error:0 , data:file};
    } catch (error) {
        console.error(error);
        return { error: 1 , data: "Server Error"};
    }
}

const uploadImage = async (req, res) => {
    try {
        const file = req.files.file;
        const filename = file.name;
        const uploadPath = path.join(__dirname, '../upload', filename);
        await file.mv(uploadPath, (err) => {
            if (err) {
                console.error(err);
                return { error: 1 , data: "Server Error" };
            }
        });
        return { error: 0 , data: "File Uploaded Successfully" };

    } catch (error) {
        console.error(error);
        return  { error: 1 , data: "Server Error" } ;
    }
}

const removeImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        const file = path.join(__dirname, '../upload', filename);
        if (!fs.existsSync(file)) {
            return { error: 1 , data: "File Not Found" };
        }
        fs.unlinkSync(file);
        return { error: 0 , data: "File Deleted Successfully" };
    } catch (error) {
        console.error(error);
        return { error: 1 , data: "Server Error"}
    }
}


module.exports = {
    getImage,
    uploadImage,
    removeImage
}
