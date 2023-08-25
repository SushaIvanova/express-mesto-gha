const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');

router.use(signupRouter);
router.use(signinRouter);
router.use(auth);
router.use(usersRouter);
router.use(cardsRouter);

module.exports = router;
