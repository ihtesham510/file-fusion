'use client'
import { UserButton } from '@clerk/nextjs'
import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'

export default function () {
	const user = useQuery(api.users.getUserIdentity)
	return (
		<div>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<UserButton />
		</div>
	)
}
