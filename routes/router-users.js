const router = require('express').Router();
const Users = require('./users-model.js');


// GET /api/users
router.get('/', withRole(), (req, res) => {

  Users.find()
    .then(users => {
      users.forEach(user => {
        user.role === 2 ? user.role = 'admin' : user.role = 'user'
      })
      res.json(users)
    })
    .catch(error => res.send(error));
});


// Middleware withRole. Reads role level, responds accordingly.
function withRole() {
  return function(req, res, next) {
    if (
      req.decodedJwt &&
      req.decodedJwt.role &&
      req.decodedJwt.role === 2
    ) {
      next();
    } else if (
      req.decodedJwt &&
      req.decodedJwt.role &&
      req.decodedJwt.role === 1
    ) {
      Users.findById(req.decodedJwt.subject)
        .then(user => {
          user.role = 'user'
          res.json(user)
        })
        .catch(error => res.send(error));
    } else {
      res.status(403).json({ message:"you have no power here" });
    }
  };
}


module.exports = router;

