const Mutations = {
	async createFarm(parent, args, ctx, info) {
		const farm = ctx.db.mutation.createItem({
			data: {
				...args
			},
			info
		});
		return farm;
	}
};

module.exports = Mutations;
