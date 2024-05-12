const { getBestProfession } = require('../services/jobsService');
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

module.exports = {getBestProfessionController}