import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getUserIdentity } from './users'

export const createFolder = mutation({
	args: {
		name: v.string(),
		owner: v.id('users'),
		org: v.optional(v.string()),
		parentref: v.optional(v.id('folder')),
	},
	async handler(ctx, args) {
		return await ctx.db.insert('folder', { ...args })
	},
})

export const getFolders = query({
	args: { org: v.optional(v.string()) },
	async handler(ctx, args_0) {
		const user = await getUserIdentity(ctx)
		if (!user) throw new ConvexError('user not found')
		const folders = await ctx.db
			.query('folder')
			.withIndex(args_0.org ? 'by_org' : 'by_owner', q =>
				q.eq(args_0.org ? 'org' : 'owner', args_0.org ? args_0.org : user._id),
			)
			.collect()
		return await Promise.all(folders.map(async folder => ({ ...folder, owner: await ctx.db.get(folder.owner) })))
	},
})
