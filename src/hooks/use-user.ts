import { useOrganization } from '@clerk/nextjs'
import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'

export default function useUser() {
	const { organization } = useOrganization()
	return useQuery(api.users.getUserData, { orgId: organization?.id })
}
