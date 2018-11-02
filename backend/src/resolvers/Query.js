const { forwardTo } = require('prisma-binding');

const Query = {
	farms: forwardTo('db'),
	farm: forwardTo('db'),
	farmsConnection: forwardTo('db')
};

module.exports = Query;
