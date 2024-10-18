'use client'
import { RedirectToSignIn, useUser } from '@clerk/nextjs'
import { PropsWithChildren } from 'react'

export default function ProptectedComponent({ children }: PropsWithChildren) {
	const { user } = useUser()
	if (!user) return <RedirectToSignIn />
	return children
}
