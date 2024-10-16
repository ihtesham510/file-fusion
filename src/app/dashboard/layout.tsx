'use client'
import { useUser } from '@clerk/nextjs'
import { PropsWithChildren } from 'react'

export default function ({ children }: PropsWithChildren) {
	const { user } = useUser()
	return (
		<div>
			<h1>hellow {user?.fullName ?? user?.username}</h1>
			{children}
		</div>
	)
}
