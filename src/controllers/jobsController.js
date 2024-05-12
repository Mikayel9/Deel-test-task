const jobsService = require('../services/jobsService');
const { handleError } = require('../utils/errorHandler');

async function getUnpaidJobs (req, res){
    const profileId = req.profile.id;

    try {
        const unpaidJobs = await jobsService.getUnpaidJobsForProfile(profileId);
        res.json(unpaidJobs);
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = {getUnpaidJobs};