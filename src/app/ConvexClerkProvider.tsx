'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { PropsWithChildren, useEffect, useState, useMemo } from 'react'
import { dark } from '@clerk/themes'
import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function CustomClerkProvider({ children }: PropsWithChildren) {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const calculatedTheme = useMemo(() => (theme === 'dark' ? dark : undefined), [theme])
	if (!mounted) return null

	return (
		<ClerkProvider
			afterSignOutUrl='/'
			signInForceRedirectUrl='/dashboard'
			signUpForceRedirectUrl='/dashboard'
			appearance={{ baseTheme: calculatedTheme }}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
