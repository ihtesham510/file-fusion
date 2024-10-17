'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { PropsWithChildren, useEffect, useState, useMemo } from 'react'
import { dark } from '@clerk/themes'

export default function ThemeClerkProvider({ children }: PropsWithChildren) {
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
			{children}
		</ClerkProvider>
	)
}
