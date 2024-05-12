const { Op, fn, col, literal } = require('sequelize');
const { Job, Contract, Profile } = require('../models/model');

const getBestClients = async (startDate, endDate, limit = 2) => {
    try {
        const bestClients = await Job.findAll({
            include: [
                {
                    model: Contract,
                    attributes: [],
                    include: [
                        {
                            model: Profile,
                            as: 'Client',
                            attributes: []
                        }
                    ]
                }
            ],
            where: {
                paid: true,
                paymentDate: {
                    [Op.between]: [startDate, endDate] 
                }
            },
            attributes: [
                [literal('`Contract->Client`.`id`'), 'id'],
                [literal('`Contract->Client`.`firstName` || " " || `Contract->Client`.`lastName`'), 'fullName'],
                [fn('SUM', col('price')), 'paid'] 
            ],
            group: [literal('`Contract->Client`.`id`')],
            order: [[fn('SUM', col('price')), 'DESC']],
            limit, 
            raw: true 
        });

        if (!bestClients || bestClients.length === 0) {
            return [];
        }

        return bestClients;
    } catch (error) {
        console.error('Error in getBestClients:', error);
        throw new Error('Error finding the best clients');
    }
};

module.exports = { getBestClients };