const contractsService = require('../services/contractsService.js');
const { Contract, sequelize } = require('../models/model');
const { Op } = require('sequelize');
const SequelizeMock = require('sequelize-mock');

const DBConnectionMock = new SequelizeMock();
const contractMock = DBConnectionMock.define('Contract', {
    terms: 'Sample terms',
    status: 'in_progress'
});

test('getContractById should return a contract', async () => {
    const findOneMock = jest.spyOn(Contract, 'findOne').mockResolvedValue(contractMock);
    const result = await contractsService.getContractById(1, 1);
    expect(result).toEqual(contractMock);
    expect(findOneMock).toHaveBeenCalledWith({
        where: {
            id: 1,
            [Op.or]: [{ ClientId: 1 }, { ContractorId: 1 }],
        },
    });
});
