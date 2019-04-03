const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../auth/secrets').jwtSecret; 
const Users = require('./users-model.js');



// POST /api/register
router.post('/register', (req, res) => {
    let user = req.body;
    // console.log(user)
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// POST /api/login
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: ["student", "ta", "staff"]
    };
    // removed the const secret from this line <<<<<<<<<<<<<<<<<<<<<<<
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options); // returns valid token
}


module.exports = router;

