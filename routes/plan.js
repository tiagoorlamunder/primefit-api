const express = require('express');
const { getPlans, subscribe, changePlan, associatePlan } = require('../controllers/plan');

const router = express.Router();

router.get('/', getPlans);
router.post('/subscribe', subscribe);
router.post('/change-plan', changePlan);
router.post('/associate', associatePlan);

module.exports = router;
