const express = require('express');

const router = express.Router();
const UserService = require('../services/user_service');
const HTTPReqParamError = require('../errors/http_base_error');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    throw new HTTPReqParamError('page', '请指定页码', 'page can not be empty');
    res.locals.users = await UserService.getAllUsers();
  })()
    .then(() => {
      res.render('users');
    })
    .catch((e) => {
      next(e);
    });

});

router.post('/', (req, res) => {
  const {name, age, sex} = req.body;
  const u = UserService.addNewUser(name, age, sex);
  res.json(u);
});

router.get('/:userId', (req, res) => {
  (async () => {
    const { userId } = req.params;
    if (userId.length < 5) throw new HTTPReqParamError('userId', '用户id不能为空', 'User id can not be empty!');
    res.locals.user = await UserService.getUserById(userId);
    res.render('user');
  })()
    .catch((e) => {
      console.log(e);
      res.json(e);
    });

});

router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = UserService.createSubscription(Number(req.params.userId), req.body.url);
    res.json(sub);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
