const { sequelize, Job, Contract, Profile } = require('../models/model');
const jobsService = require('../services/jobsService');
const balancesService = require('../services/balancesService');
const { handleError } = require('../utils/errorHandler');

async function depositAndCheckUnpaidJobs(req, res) {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
        const transaction = await sequelize.transaction();
        try {
            const totalUnpaidJobs = await jobsService.calculateTotalUnpaidJobs(userId, transaction);
            const depositMessage = await balancesService.depositMoney(userId, amount, transaction, totalUnpaidJobs);
            await transaction.commit();
            res.json({ message: depositMessage });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = {depositAndCheckUnpaidJobs}
