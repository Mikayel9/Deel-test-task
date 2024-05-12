const express = require('express');
const router = express.Router();
const { getBestProfessionController } = require('../controllers/adminController');
const { validateDateRange } = require('../middleware/dateValidation');


router.get('/best-profession', validateDateRange, getBestProfessionController);

module.exports = router;