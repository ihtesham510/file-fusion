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
	})
		.index('by_token', ['tokenIdentifier'])
		.index('by_userId', ['id']),
	files: defineTable({
		file_name: v.string(),
		file_type: v.union(v.literal('')),
		userId: v.optional(v.id('users')),
		org: v.object({ user: v.id('users'), org: v.id('organization') }),
		file_size: v.number(),
		file_url: v.string(),
		storageId: v.id('_storage'),
	}),
	organization: defineTable({
		org_name: v.string(),
		image_url: v.optional(v.string()),
		logo_url: v.optional(v.string()),
		id: v.string(),
		users: v.array(v.object({ user_id: v.id('users'), role: v.string() })),
	}).index('by_orgId', ['id']),
	collections: defineTable({
		name: v.string(),
		image_url: v.string(),
		files: v.array(v.id('files')),
	}),
})
