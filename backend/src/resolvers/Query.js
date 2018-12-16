const { forwardTo } = require('prisma-binding');

const Query = {
  farms: forwardTo('db'),
  farm: forwardTo('db'),
  farmsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  products: forwardTo('db'),
  product: forwardTo('db'),
  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You are not logged in.');
    }
    const order = await ctx.db.query.order({ where: { id: args.id } }, info);
    console.log(order);
    const ownsOrder = order.user.id === ctx.request.userId;
    if (!ownsOrder) {
      throw new Error('You are not allowed to view that.');
    }
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You are not logged in');
    }
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info
    );
  },
};

module.exports = Query;
