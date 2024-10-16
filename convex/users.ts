import { ConvexError, v } from 'convex/values'
import { internalMutation, MutationCtx, QueryCtx } from './_generated/server'

export async function getUserIdentity(ctx: MutationCtx | QueryCtx) {
	const tokenIdentifier = await ctx.auth.getUserIdentity().then(data => data?.tokenIdentifier)
	if (!tokenIdentifier) throw new ConvexError('token Identifier not found')
	return await ctx.db
		.query('users')
		.withIndex('by_token', q => q.eq('tokenIdentifier', tokenIdentifier))
		.first()
}

export async function getUserData(ctx: MutationCtx | QueryCtx, id_s: { tokenIdentifier?: string; userId?: string }) {
	const { tokenIdentifier, userId } = id_s
	if (tokenIdentifier) {
		return ctx.db
			.query('users')
			.withIndex('by_token', q => q.eq('tokenIdentifier', tokenIdentifier))
			.first()
	}
	if (userId) {
		return ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', userId))
			.first()
	}
	return null
}

export const createUser = internalMutation({
	/*
	 *create User
	 *if user already exists then skip
	 */
	args: {
		id: v.string(),
		first_name: v.optional(v.string()),
		last_name: v.optional(v.string()),
		username: v.optional(v.string()),
		email: v.string(),
		imageUrl: v.string(),
		tokenIdentifier: v.string(),
	},
	async handler(ctx, args_0) {
		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', args_0.id))
			.first()
		if (!user) return await ctx.db.insert('users', { ...args_0 })
	},
})

export const updateUser = internalMutation({
	/*
	 *find User and update
	 *if user not found throw error
	 */
	args: {
		id: v.string(),
		first_name: v.optional(v.string()),
		last_name: v.optional(v.string()),
		username: v.optional(v.string()),
		email: v.string(),
		imageUrl: v.string(),
		tokenIdentifier: v.string(),
	},
	async handler(ctx, args_0) {
		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', args_0.id))
			.first()
		if (!user) throw new ConvexError('user not found')
		return await ctx.db.patch(user._id, { ...args_0 })
	},
})

export const delUser = internalMutation({
	/*
	 *find User by id provided by clerk
	 *if user not found throw error
	 */
	args: {
		id: v.string(),
	},
	async handler(ctx, args_0) {
		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', args_0.id))
			.first()
		if (!user) throw new ConvexError('user not found')
		return await ctx.db.delete(user._id)
	},
})
