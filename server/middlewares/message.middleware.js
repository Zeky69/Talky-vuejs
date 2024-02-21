const {getFriends} = require("../services/friend.service");


const checkFriend = async (req, res, next) => {
    try {
        const {friends} = req.body;
        const friend = (await getFriends(req.user)).map(f => f.friend_id);
        for (let i = 0; i < friends.length; i++) {
            console.log(friends[i] , friend , friend.includes(friends[i]))

            if (!friend.includes(friends[i])) {
                return res.status(400).json({error: "You are not friend with " + friends[i]});
            }
        }
        next();




    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    checkFriend
};