import { query } from './_generated/server'

export const getUserIdentity = query({
	handler: async (ctx) => {
		return await ctx.auth.getUserIdentity()
	},
})
