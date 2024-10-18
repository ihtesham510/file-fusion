import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'

export default function useUser() {
	return useQuery(api.users.getUserData)
}
