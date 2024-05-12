const contractsService = require('../services/contractsService.js');
const { handleError } = require('../utils/errorHandler');


async function getContractById (req, res){
    const { id } = req.params;
    const profileId = req.profile.id;

    try {
        const contract = await contractsService.getContractById(id, profileId);
        if (!contract) {
            return res.status(404).json({ error: 'No such contract found or access denied' });
        }
        res.json(contract);
    } catch (error) {
        handleError(error, res);
    }
};

async function getAllContracts(req, res){
    const profileId = req.profile.id;

    try {
        const contracts = await contractsService.getAllNonTerminatedContracts(profileId);
        res.json(contracts);
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = { getContractById, getAllContracts};