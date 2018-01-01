const express = require('express');

const router = express.Router();

const userRouter = require('./users');

const JWT = require('jsonwebtoken');

const User = require('.././models/mongoose/user');

const crypto = require('crypto');

const pbkdf2Async = require('bluebird').promisify(crypto.pbkdf2);

router.post('/login', (req, res, next) => {
  (async () => {
    const {username, password} = req.body;
    const cipher = await crypto.pbkdf2(password, 'fdafdsafafdsafa', 1000, 512, 'sha256');
    const created = await User.insert({username, password: cipher});
  })()
    .then(r => {

    })
    .catch(e => {

    })

});

router.get('/hello', (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth) return res.send('no auth');
  if (auth.indexOf('Bearer ') === -1) return res.send('no auth');
  const token = auth.split('Bearer ')[1];
  const user = JWT.verify(token, 'fdjsklafsda');
  res.send(user);

});

router.use('/user', userRouter);

module.exports = router;
