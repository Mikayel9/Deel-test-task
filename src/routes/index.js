const express = require('express');
const router = express.Router();

const contractsRouter = require('./contracts');

router.use('/contracts', contractsRouter);

module.exports = router;