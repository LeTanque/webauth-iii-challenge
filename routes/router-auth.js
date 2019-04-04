const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../auth/secrets').jwtSecret; 
const Users = require('./users-model.js');

const errors = { // J.Pinkman Dynamic error messaging based on sqlite codes 
    '1': 'We ran into an error, yo! I dunno!',
    '4': 'Operation aborted, yo!',
    '9': 'Operation aborted, yo!',
    '19': 'Another record with that value exists, yo!'
};


// POST /api/register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            const message = errors[error.errno] || 'We ran into an error, yo! Crazy!';
            res.status(500).json({ message });
        });
});


// POST /api/login
router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message:"Username and password required" })
    }
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
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
            const message = errors[error.errno] || 'We ran into an error, yo! Crazy!';
            res.status(500).json({ message });
        });
});


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options); // returns valid token
}


module.exports = router;

