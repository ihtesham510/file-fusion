import { ConvexError, v } from 'convex/values'
import { internalMutation, MutationCtx, QueryCtx } from './_generated/server'
import { getUserData, getUserIdentity } from './users'

export async function hasAccesstoOrg(ctx: MutationCtx | QueryCtx, orgId: string, userId: string) {}

export const createOrg = internalMutation({
	/*
	 * create Org
	 * if org already Exists then skip
	 */
	args: {
		org_name: v.string(),
		id: v.string(),
		image_url: v.optional(v.string()),
		logo_url: v.optional(v.string()),
		users: v.array(v.object({ user_id: v.id('users'), role: v.string() })),
	},
	async handler(ctx, args_0) {
		const org = await ctx.db
			.query('organization')
			.withIndex('by_orgId', q => q.eq('id', args_0.id))
			.first()
		if (!org) return ctx.db.insert('organization', { ...args_0 })
	},
})

export const updateOrg = internalMutation({
	/*
	 * Update Org
	 * if org is not found then throw Error
	 */
	args: {
		org_name: v.string(),
		id: v.string(),
		image_url: v.optional(v.string()),
		logo_url: v.optional(v.string()),
	},
	async handler(ctx, args_0) {
		const org = await ctx.db
			.query('organization')
			.withIndex('by_orgId', q => q.eq('id', args_0.id))
			.first()
		if (!org) throw new ConvexError('Organization not found')
		return ctx.db.patch(org._id, { ...args_0 })
	},
})

export const delOrg = internalMutation({
	/*
	 * delete Org
	 * if org is not found then throw Error
	 */
	args: {
		id: v.string(),
	},
	async handler(ctx, args_0) {
		const org = await ctx.db
			.query('organization')
			.withIndex('by_orgId', q => q.eq('id', args_0.id))
			.first()
		if (!org) throw new ConvexError('Organization not found')
		return ctx.db.delete(org._id)
	},
})

export const createMemShip = internalMutation({
	/*
	 * first find the user from the getUserData() helper function which returns the userData from DB
	 * then find the org by its ID prvided by clerk (not the DB)
	 * then add the user to the organization
	 */
	args: { userId: v.string(), orgId: v.string(), role: v.string() },
	async handler(ctx, args_0) {
		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', args_0.userId))
			.first()
		if (!user) throw new ConvexError('user not found')
		const org = await ctx.db
			.query('organization')
			.withIndex('by_orgId', q => q.eq('id', args_0.orgId))
			.first()

		if (!org) throw new ConvexError('organization not found')
		return await ctx.db.patch(org._id, { users: [...org.users, { role: args_0.role, user_id: user._id }] })
	},
})

export const updateMemShip = internalMutation({
	/*
	 * first find the user from the getUserData() helper function which returns the userData from DB
	 * if user not found in DB then throw Error
	 * then find the org by its ID prvided by clerk (not the DB)
	 * if Org not found in DB then throw Error
	 * then update the role by mapping over the array of objects
	 */
	args: { userId: v.string(), orgId: v.string(), role: v.string() },
	async handler(ctx, args_0) {
		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', args_0.userId))
			.first()
		if (!user) throw new ConvexError('user not found')
		const org = await ctx.db
			.query('organization')
			.withIndex('by_orgId', q => q.eq('id', args_0.orgId))
			.first()

		if (!org) throw new ConvexError('organization not found')
		return await ctx.db.patch(org._id, {
			users: org.users.map(u => (u.user_id === user._id ? { ...u, role: args_0.role } : u)),
		})
	},
})

export const delMemShip = internalMutation({
	/*
	 * first find the user from the getUserData() helper function which returns the userData from DB
	 * if user not found in DB then throw Error
	 * then find the org by its ID prvided by clerk (not the DB)
	 * if Org not found in DB then throw Error
	 * then delete the membership by filtering over the array of users
	 */
	args: { userId: v.string(), orgId: v.string() },
	async handler(ctx, args_0) {
		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('id', args_0.userId))
			.first()
		if (!user) throw new ConvexError('user not found')
		const org = await ctx.db
			.query('organization')
			.withIndex('by_orgId', q => q.eq('id', args_0.orgId))
			.first()

		if (!org) throw new ConvexError('organization not found')
		return await ctx.db.patch(org._id, {
			users: org.users.filter(u => u.user_id !== user._id),
		})
	},
})
