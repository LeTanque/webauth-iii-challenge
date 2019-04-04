const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routes/router-auth.js');
const usersRouter = require('../routes/router-users.js');
const restricted = require('../auth/restricted.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);
server.use('/api/users', restricted, usersRouter); // All /api/users requests go through restricted

server.get('/', (req, res) => {
  res.send("It's alive!");
});


module.exports = server;

