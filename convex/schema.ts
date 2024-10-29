import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		id: v.string(),
		first_name: v.optional(v.string()),
		last_name: v.optional(v.string()),
		username: v.optional(v.string()),
		email: v.string(),
		imageUrl: v.string(),
		tokenIdentifier: v.string(),
		parentref: v.optional(v.id('folder')),
	})
		.index('by_token', ['tokenIdentifier'])
		.index('by_userId', ['id'])
		.index('by_folder', ['parentref']),
	files: defineTable({
		file_name: v.string(),
		file_type: v.string(),
		user: v.id('users'),
		org: v.optional(v.string()),
		file_size: v.number(),
		file_url: v.string(),
		storageId: v.id('_storage'),
	}),
	collections: defineTable({
		name: v.string(),
		userId: v.optional(v.id('users')),
		org: v.object({ user: v.id('users'), org: v.string() }),
		image_url: v.string(),
		files: v.array(v.id('files')),
	}).index('by_user_org', ['org.org', 'org.user']),
	folder: defineTable({
		name: v.string(),
		owner: v.id('users'),
		org: v.optional(v.string()),
		parentref: v.optional(v.id('folder')),
	})
		.index('by_owner', ['owner'])
		.index('by_org', ['org']),
})
