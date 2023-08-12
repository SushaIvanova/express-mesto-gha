const router = require('express').Router();
const {
  getAllUsers, getUserById, createUser, editProfile, editAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/users/me', editProfile);

router.patch('/users/me/avatar', editAvatar);

module.exports = router;
