const {getPublicAccountById} = require('../services/auth.service');

exports.getProfile = async (req, res) => {
    try {
        const user = await getPublicAccountById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
