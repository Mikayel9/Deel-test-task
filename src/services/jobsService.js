const { Job, Contract } = require('../models/model');
const { Op } = require('sequelize');

async function getUnpaidJobsForProfile(profileId) {
    try {
        const unpaidJobs = await Job.findAll({
            where: {
                paid: false
            },
            include: [{
                model: Contract,
                where: {
                    status: 'in_progress',
                    [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }]
                }
            }]
        });
        return unpaidJobs;
    } catch (error) {
        console.error('Error fetching unpaid jobs:', error);
        throw error;
    }
}

module.exports = {getUnpaidJobsForProfile}