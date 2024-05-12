const express = require('express');
const router = express.Router();
const { getBestProfessionController, getBestClientsController } = require('../controllers/adminController');
const { validateDateRange } = require('../middleware/dateValidation');
const { validateLimit } = require('../middleware/limitValidation');



router.get('/best-profession', validateDateRange, getBestProfessionController);
router.get('/best-clients', validateDateRange, validateLimit, getBestClientsController);

module.exports = router;