import { httpRouter } from 'convex/server'

import { internal } from './_generated/api'
import { httpAction } from './_generated/server'

const http = httpRouter()

http.route({
	path: '/clerk',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const payloadString = await request.text()
		const headerPayload = request.headers

		try {
			const result = await ctx.runAction(internal.clerk.fulfill, {
				payload: payloadString,
				headers: {
					'svix-id': headerPayload.get('svix-id')!,
					'svix-timestamp': headerPayload.get('svix-timestamp')!,
					'svix-signature': headerPayload.get('svix-signature')!,
				},
			})

			switch (result.type) {
				case 'user.created':
					await ctx.runMutation(internal.users.createUser, {
						id: result.data.id,
						email: result.data.email_addresses[0].email_address,
						first_name: result.data.first_name ?? undefined,
						last_name: result.data.last_name ?? undefined,
						username: result.data.username ?? undefined,
						imageUrl: result.data.image_url,
						tokenIdentifier: `${process.env.CLERK_AUTH_DOMAIN}|${result.data.id}`,
					})
					break
				case 'user.updated':
					await ctx.runMutation(internal.users.updateUser, {
						id: result.data.id,
						email: result.data.email_addresses[0].email_address,
						first_name: result.data.first_name ?? undefined,
						last_name: result.data.last_name ?? undefined,
						username: result.data.username ?? undefined,
						imageUrl: result.data.image_url,
						tokenIdentifier: `${process.env.CLERK_AUTH_DOMAIN}|${result.data.id}`,
					})
					break
				case 'user.deleted':
					if (result.data.id) {
						await ctx.runMutation(internal.users.delUser, { id: result.data.id })
					}
					break
				case 'organization.created':
					break
				case 'organization.updated':
					break
				case 'organization.deleted':
					break
				case 'organizationMembership.created':
					break
				case 'organizationMembership.updated':
					break
				case 'organizationMembership.deleted':
					break
			}

			return new Response(null, {
				status: 200,
			})
		} catch (err) {
			return new Response('Webhook Error', {
				status: 400,
			})
		}
	}),
})

export default http
