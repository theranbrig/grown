const { forwardTo } = require('prisma-binding');

const Query = {
	farms: forwardTo('db'),
	farm: forwardTo('db'),
	farmsConnection: forwardTo('db'),
	me(parent, args, ctx, info) {
		console.log('is this called at all?????????????????????????????????', ctx.request);
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	},
	products: forwardTo('db'),
	product: forwardTo('db')
};

module.exports = Query;
