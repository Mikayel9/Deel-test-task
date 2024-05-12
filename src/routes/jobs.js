const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { getProfile } = require('../middleware/getProfile');

router.get('/unpaid', getProfile, jobsController.getUnpaidJobs);
router.post('/:job_id/pay', getProfile, jobsController.payForJob);


module.exports = router;