const express = require('express');
const { getUserPlan } = require('../controllers/user');

const router = express.Router();

router.get('/plan', getUserPlan);

module.exports = router;
