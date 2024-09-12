const express = require('express');
const { getPlans, subscribe, changePlan } = require('../controllers/plan');

const router = express.Router();

router.get('/', getPlans);
router.post('/subscribe', subscribe);
router.post('/change-plan', changePlan);

module.exports = router;
