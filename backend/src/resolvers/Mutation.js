const Mutations = {
	async createFarm(parent, args, ctx, info) {
		const farm = ctx.db.mutation.createFarm({
			data: {
				...args
			},
			info
		});
		return farm;
	}
};

module.exports = Mutations;
