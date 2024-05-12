const express = require('express');
const router = express.Router();
const balancesController = require('../controllers/balancesController');
const { getProfile } = require('../middleware/getProfile');
const { validateDeposit } = require('../middleware/depositValidation');
router.use(getProfile);

router.post('/deposit/:userId', validateDeposit, balancesController.depositAndCheckUnpaidJobs);

module.exports = router;
