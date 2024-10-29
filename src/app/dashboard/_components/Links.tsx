'use client'

import { Star, TrashIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export default function Links() {
	const pathname = usePathname()
	const isActive = (path: string) => pathname.split('/').includes(path)
	return (
		<>
			<Link href='/dashboard/favorites-files'>
				<SidebarMenuButton
					className={`${isActive('favorites-files') ? 'text-foreground' : 'text-muted-foreground'} font-semibold flex items-center gap-2 px-2.5 hover:text-foreground`}
				>
					<Star className='size-4' />
					Favorites
				</SidebarMenuButton>
			</Link>
			<Link href='/dashboard/trash-files'>
				<SidebarMenuButton
					className={`${isActive('trash-files') ? 'text-foreground' : 'text-muted-foreground'} font-semibold flex items-center gap-2 px-2.5 hover:text-foreground`}
				>
					<TrashIcon className='size-4' />
					Trash
				</SidebarMenuButton>
			</Link>
		</>
	)
}
