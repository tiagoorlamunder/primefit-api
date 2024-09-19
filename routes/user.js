const express = require('express');
const { getUserInfo } = require('../controllers/user');

const router = express.Router();

router.get('/info', getUserInfo);

module.exports = router;
