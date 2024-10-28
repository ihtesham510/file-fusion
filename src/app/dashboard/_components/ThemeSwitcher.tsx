'use client'

import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()
	return (
		<Switch checked={theme === 'dark'} onCheckedChange={e => (e ? setTheme('dark') : setTheme('light'))} className='' />
	)
}
