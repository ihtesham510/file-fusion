import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'
import useUser from './use-user'

export default function useFiles() {
	const user = useUser()
	const files = useQuery(api.file.getfiles, { orgId: user?.orgId })
	return { files }
}
