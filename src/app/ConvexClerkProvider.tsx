'use client'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { PropsWithChildren, useEffect, useState, useMemo } from 'react'
import { dark } from '@clerk/themes'
import { LoaderCircleIcon } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
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
			signInForceRedirectUrl='/dashboard/allfiles'
			signUpForceRedirectUrl='/dashboard/allfiles'
			appearance={{ baseTheme: calculatedTheme }}
		>
			<ClerkLoading>
				<div className='flex justify-center items-center h-screen w-full'>
					<LoaderCircleIcon size={40} className='animate-spin' />
				</div>
			</ClerkLoading>
			<ClerkLoaded>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					{children}
				</ConvexProviderWithClerk>
			</ClerkLoaded>
		</ClerkProvider>
	)
}
