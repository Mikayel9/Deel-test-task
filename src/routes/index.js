const express = require('express');
const router = express.Router();

const contractsRouter = require('./contracts');
const jobsRouter = require('./jobs');
const balancesRouter = require('./balances');
const adminsRouter = require('./admin');

router.use('/contracts', contractsRouter);
router.use('/jobs', jobsRouter);
router.use('/balances', balancesRouter);
router.use('/admin', adminsRouter);
module.exports = router;