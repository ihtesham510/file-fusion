'use client'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()
	return (
		<Button variant='outline' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
			{theme === 'dark' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
