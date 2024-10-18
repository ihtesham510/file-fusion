import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'

export default function useFiles() {
	const { organization } = useOrganization()
	const files = useQuery(api.file.getfiles, { orgId: organization?.id })
	return { files }
}
