import { useOrganization } from '@clerk/nextjs'
import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'

export default function useFolder() {
	const { organization } = useOrganization()
	return useQuery(api.folder.getFolders, { org: organization?.id })
}
