import { ConvexError, v } from 'convex/values'
import { internalMutation, MutationCtx, query, QueryCtx } from './_generated/server'

export async function getUserIdentity(ctx: MutationCtx | QueryCtx) {
	const tokenIdentifier = await ctx.auth.getUserIdentity().then(data => data?.tokenIdentifier)
	if (!tokenIdentifier) throw new ConvexError('token Identifier not found')
	return await ctx.db
		.query('users')
		.withIndex('by_token', q => q.eq('tokenIdentifier', tokenIdentifier))
		.first()
}

export const getUserData = query({
	args: { orgId: v.optional(v.string()) },
	async handler(ctx, args_0) {
		const user = await getUserIdentity(ctx)
		if (!user) throw new ConvexError('User not found')
		if (args_0.orgId) {
			const org = await ctx.db
				.query('organization')
				.withIndex('by_orgId', q => q.eq('id', args_0.orgId!))
				.first()

			// NOTE: for safety measueres
			if (!org) throw new ConvexError('org not found')

			const userInOrg = org.users.find(u => u.user_id === user._id)

			// NOTE: for safety measueres
			if (!userInOrg) throw new ConvexError('user is not present in org')

			return { ...user, role: userInOrg.role, orgId: org._id }
		}
		return { ...user, role: undefined, orgId: undefined }
	},
})

export const createUser = internalMutation({
	/*
	 * create User
	 * if user already exists then skip
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
