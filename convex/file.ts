import { ConvexError, v } from 'convex/values'
import { mutation, query, QueryCtx } from './_generated/server'
import { getUserIdentity } from './users'
import { Id } from './_generated/dataModel'

async function getUser(ctx: QueryCtx, id: Id<'users'>) {
	const data = await ctx.db.get(id)
	if (!data) throw new ConvexError('user not found')
	const { first_name, last_name, username, imageUrl, email } = data
	return { first_name, last_name, username, imageUrl, email }
}

export const getfiles = query({
	/*
	 * first get the user identity from getUserIdentity helper function
	 *
	 * if(orgId is defined) then collect files by their orgId
	 * else
	 * query files by userId where org is undefined
	 *
	 * then map through the files and get the user data
	 *  insert the user data in the file object and resturn the array
	 */
	args: {
		orgId: v.optional(v.string()),
	},
	async handler(ctx, args_0) {
		const user = await getUserIdentity(ctx)
		if (!user) throw new ConvexError('user not found')
		const files = await ctx.db
			.query('files')
			.filter(q =>
				args_0.orgId
					? q.eq(q.field('org'), args_0.orgId)
					: q.and(q.eq(q.field('user'), user._id), q.eq(q.field('org'), undefined)),
			)
			.order('desc')
			.collect()
		return await Promise.all(
			files.map(async file => ({
				...file,
				user: await getUser(ctx, file.user),
			})),
		)
	},
})

export const createFile = mutation({
	args: {
		file_name: v.string(),
		file_type: v.string(),
		userId: v.id('users'),
		org: v.optional(v.string()),
		file_size: v.number(),
		file_url: v.string(),
		storageId: v.id('_storage'),
	},
	async handler(ctx, args_0) {
		return await ctx.db.insert('files', {
			file_name: args_0.file_name,
			file_type: args_0.file_type,
			user: args_0.userId,
			org: args_0.org,
			file_size: args_0.file_size,
			file_url: args_0.file_url,
			storageId: args_0.storageId,
		})
	},
})

export const renameFile = mutation({
	args: { file_id: v.id('files'), name: v.string() },
	async handler(ctx, args_0) {
		return ctx.db.patch(args_0.file_id, { file_name: args_0.name })
	},
})

export const getUploadUrl = mutation({
	async handler(ctx) {
		return await ctx.storage.generateUploadUrl()
	},
})

export const getFileUrl = mutation({
	args: { id: v.id('_storage') },
	async handler(ctx, args_0) {
		return await ctx.storage.getUrl(args_0.id)
	},
})
