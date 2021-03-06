const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, resetPasswordEmail } = require('../mail');
const stripe = require('../stripe');
require('dotenv').config({ path: 'variables.env' });

const Mutations = {
  async createFarm(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // Create Item
    const properName = args.name.toLowerCase();
    const properLocation = args.name.toLowerCase();
    const farm = ctx.db.mutation.createFarm(
      {
        data: {
          // Connect to User Foreign Key
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
          name: properName,
          location: properLocation,
          ...args,
        },
      },
      info
    );
    console.log(farm);
    return farm;
  },
  updateFarm(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    if (args.name) {
      args.name = args.name.toLowerCase();
    }
    if (args.location) {
      args.location = args.location.toLowerCase();
    }
    // Create Updates
    const updates = { ...args };
    console.log(updates);
    // Remove new ID to save old ID over it
    delete updates.id;
    return ctx.db.mutation.updateFarm(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteFarm(parent, args, ctx, info) {
    const where = { id: args.id };
    // Find item in db
    const farm = await ctx.db.query.farm({ where }, `{id name user {id}}`);
    // Check if owner or permissions
    console.log(farm);
    const farmOwner = farm.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'FARMDELETE'].includes(permission)
    );
    if (!farmOwner && !hasPermissions) {
      throw new Error('You are not allowed to do that!');
    }
    // Delete
    return ctx.db.mutation.deleteFarm({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // Hash Password
    const password = await bcrypt.hash(args.password, 15);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // Create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // Set JWT as cookie for response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Two week token
    });
    console.log('You Signed Up');
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async requestReset(parent, args, ctx, info) {
    // Check if user exists
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // Create Reset Token with Expiration
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000 * 24; // One Day Token
    // Add Reset Token to DB
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });
    // Create Email
    const mailRes = await transport.sendMail({
      from: 'password@grown.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: resetPasswordEmail(`Your Password Reset Token is here!
      <br/>
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
    });
    // Return Email
    return { message: 'Thanks' };
  },

  async resetPassword(parent, args, ctx, info) {
    // Check passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error('Passwords must match!');
    }
    // Check if Token is real and not expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000 * 24,
      },
    });
    if (!user) {
      throw new Error('This token is either invalid or expired. Please request password reset again.');
    }
    // Hash new password, save to DB and delete Reset Token
    const password = await bcrypt.hash(args.password, 15);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    // Create JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // Set JWT as cookie for response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Two week token
    });
    console.log('You Logged In');
    return updatedUser;
  },
  async createProduct(parent, args, ctx, info) {
    const farmID = args.farmId;
    const product = await ctx.db.mutation.createProduct(
      {
        data: {
          farm: {
            connect: {
              id: farmID,
            },
          },
          ...args,
        },
      },
      info
    );
    console.log(product);
    return product;
  },
  updateProduct(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // Create Updates
    const updates = { ...args };
    console.log(updates);
    // Remove new ID to save old ID over it
    delete updates.id;
    return ctx.db.mutation.updateProduct(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteProduct(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const where = { id: args.id };
    // TODO: CHECK FARM OWNER
    return ctx.db.mutation.deleteProduct({ where }, info);
  },
  async addToCart(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be logged in to do that.');
    }
    const [existingCartProduct] = await ctx.db.query.cartProducts({
      where: {
        user: { id: userId },
        product: { id: args.id },
      },
    });
    if (existingCartProduct) {
      console.log('This product is in your cart.');
      return ctx.db.mutation.updateCartProduct(
        {
          where: { id: existingCartProduct.id },
          data: { quantity: existingCartProduct.quantity + 1 },
        },
        info
      );
    }
    return ctx.db.mutation.createCartProduct(
      {
        data: {
          user: {
            connect: { id: userId },
          },
          product: {
            connect: { id: args.id },
          },
        },
      },
      info
    );
  },
  async removeFromCart(parent, args, ctx, info) {
    const cartProduct = await ctx.db.query.cartProduct(
      {
        where: {
          id: args.id,
        },
      },
      `{id, user {id}}`
    );
    if (!cartProduct) throw new Error('Product not found.');
    if (cartProduct.user.id !== ctx.request.userId) {
      throw new Error('User Id Error');
    }
    return ctx.db.mutation.deleteCartProduct(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async removeOneFromCart(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be logged in to do that.');
    }
    const [existingCartProduct] = await ctx.db.query.cartProducts({
      where: {
        user: { id: userId },
        product: { id: args.id },
      },
    });
    if (existingCartProduct && existingCartProduct.quantity > 1) {
      console.log('This product is in your cart.');
      return ctx.db.mutation.updateCartProduct(
        {
          where: { id: existingCartProduct.id },
          data: { quantity: existingCartProduct.quantity - 1 },
        },
        info
      );
    }
  },
  async createOrder(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error('You must be logged in to do that.');
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
        id
        name
        email
        cart {
          id
          quantity
          product { id name price description farmId }}}`
    );
    const { cart } = user;
    console.log(cart);
    // Calculate Total Amount
    const amount = user.cart.reduce(
      (tally, cartProduct) => tally + cartProduct.product.price * cartProduct.quantity * 100,
      0
    );
    console.log(`Your total is ${amount}`);
    // Create Stripe Charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token,
    });
    console.log(charge);
    const orderProducts = user.cart.map(cartProduct => {
      console.log(cartProduct);
      const orderProduct = {
        ...cartProduct.product,
        quantity: cartProduct.quantity,
        product: {
          connect: { id: cartProduct.product.id },
        },
        user: { connect: { id: userId } },
      };
      delete orderProduct.id;
      return orderProduct;
    });
    console.log(orderProducts);
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderProducts },
        user: { connect: { id: userId } },
      },
    });
    console.log(order);
    const cartProductIds = user.cart.map(cartProduct => cartProduct.id);
    console.log(cartProductIds);
    await ctx.db.mutation.deleteManyCartProducts({
      where: {
        id_in: cartProductIds,
      },
    });
    return order;
  },
};

module.exports = Mutations;
