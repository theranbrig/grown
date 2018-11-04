const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { randomBytes } = require('crypto');
const { transport, resetPasswordEmail } = require('../mail');
const { hasPermission } = require('../utils');
require('dotenv').config({ path: 'variables.env' });

const Mutations = {
	async createFarm(parent, args, ctx, info) {
		// Create Item
		const farm = ctx.db.mutation.createFarm(
			{
				data: {
					// Connect to User Foreign Key
					user: {
						connect: {
							id: ctx.request.userId
						}
					},
					...args
				}
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

		// Create Updates
		const updates = { ...args };
		console.log(updates);
		// Remove new ID to save old ID over it
		delete updates.id;
		return ctx.db.mutation.updateFarm(
			{
				data: updates,
				where: {
					id: args.id
				}
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
					permissions: { set: ['USER'] }
				}
			},
			info
		);
		// Create JWT
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// Set JWT as cookie for response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 14 // Two week token
		});
		console.log('You Signed Up');
		return user;
	},

	async signin(parent, { email, password }, ctx, info) {
		const user = await ctx.db.query.user({ where: { email } });
		// Check if user exists
		if (!user) {
			throw new Error(`No such user fround for email ${email}`);
		}
		// Check if password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Wrong Password!');
		}
		// Create JWT
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// Set JWT as cookie for response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 14 // Two week token
		});
		console.log(token);
		console.log('You Logged In');
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
			data: { resetToken, resetTokenExpiry }
		});
		// Create Email
		const mailRes = await transport.sendMail({
			from: 'password@grown.com',
			to: user.email,
			subject: 'Your Password Reset Token',
			html: resetPasswordEmail(`Your Password Reset Token is here!
      <br/>
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
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
				resetTokenExpiry_gte: Date.now() - 3600000 * 24
			}
		});
		if (!user) {
			throw new Error(
				'This token is either invalid or expired. Please request password reset again.'
			);
		}
		// Hash new password, save to DB and delete Reset Token
		const password = await bcrypt.hash(args.password, 15);
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null
			}
		});
		// Create JWT
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
		// Set JWT as cookie for response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 14 // Two week token
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
							id: farmID
						}
					},
					...args
				}
			},
			info
		);
		console.log(product);
		return product;
	}
};

module.exports = Mutations;
