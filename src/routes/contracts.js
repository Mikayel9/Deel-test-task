const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController');
const { getProfile } = require('../middleware/getProfile');

router.use(getProfile);

router.get('/:id', contractsController.getContractById);

module.exports = router;