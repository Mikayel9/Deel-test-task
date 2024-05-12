const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { getProfile } = require('../middleware/getProfile');

router.get('/unpaid', getProfile, jobsController.getUnpaidJobs);


module.exports = router;