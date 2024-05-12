const { Contract } = require('../models/model');
const { Op } = require('sequelize');

async function getContractById(id, profileId){
    const contract = await Contract.findOne({
        where: {
            id,
            [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
    });

    if (!contract) {
        throw new Error('Contract not found or unauthorized access');
    }
    return contract;
};

async function  getAllNonTerminatedContracts(profileId){
    return await Contract.findAll({
        where: {
            [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
            status: { [Op.ne]: 'terminated' }, 
        },
    });
};

module.exports = {
    getContractById,
    getAllNonTerminatedContracts
};
