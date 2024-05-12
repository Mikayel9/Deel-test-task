const { getBestProfession } = require('../services/jobsService');
const { getBestClients } = require('../services/adminService');
const { handleError } = require('../utils/errorHandler');

async function getBestProfessionController(req, res) {
    try {
        const { start, end } = req.query;
        const bestProfession = await getBestProfession(start, end);


        if (!bestProfession) {
            return res.status(404).json({ message: 'No profession found within the specified date range.' });
        }

        res.json({ profession: bestProfession.profession, totalEarnings: bestProfession.totalEarnings });
    } catch (error) {
        handleError(error, res);
    }
}

const getBestClientsController = async (req, res) => {
    try {
        const { start, end, limit } = req.query;
        const bestClients = await getBestClients(start, end, limit);
        res.json(bestClients);
    } catch (error) {
        console.error('Error in getBestClientsController:', error);
        handleError(error, res);
    }
};

module.exports = {getBestProfessionController, getBestClientsController}