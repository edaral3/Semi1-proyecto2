const express = require('express');
const router = express.Router();

const user = require('../controllers/userController');
const publication = require('../controllers/publicationController');

//usuarios
router.post('/user/login', user.login);
router.post('/user/signin', user.signin);
router.put('/user/update/:_id', user.update);//pendiente
router.get('/user/getOne/:_id', user.getOne);
router.get('/user/getNotFriends/:_id', user.getNotFriends);
router.get('/user/getFriends/:_id', user.getFriends);
router.post('/user/addFriend', user.addFriend);

//publicaciones
router.post('/publication/create', publication.create);
router.get('/publication/get/:_id/:filter', publication.getAll);
router.get('/publication/getFilters/:_id', publication.getFilter);
router.post('/publication/translate', publication.translate);

module.exports = router;