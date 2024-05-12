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

module.exports = {
    getContractById
};
