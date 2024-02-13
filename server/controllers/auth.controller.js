
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getAccount, createAccount, getAccountById} = require("../services/auth.service");
const jwtSecret = 'proutsanslesfourmiscendrs';



exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log("tentative de login");
        const user = await getAccount(username, password)
        console.log(user);
        if (user) {
            const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '24h' });
            res.status(200).json({ token, userId: user.id, username: user.username ,avatar: user.avatar ,email: user.email});
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await createAccount(username, hashedPassword);

        const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '24h' });

        res.json({ token, userId: newUser.id, username: newUser.username ,avatar: newUser.avatar ,email: newUser.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.checkToken = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];


    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({error: 'Invalid token d'});
            }

            try {
                const user = await getAccountById(decoded.userId);

                console.log(user, "user");

                return res.status(200).json({
                    userId: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email
                });
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        }
    );
}