'use client'

import { FileIcon, Star, TrashIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Links() {
	const pathname = usePathname()
	const isActive = (path: string) => pathname.split('/').includes(path)
	return (
		<nav className='grid gap-6 text-lg font-medium'>
			<Link
				href='/dashboard/allfiles'
				className={`${isActive('allfiles') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
			>
				<FileIcon className='h-5 w-5' />
				All Files
			</Link>
			<Link
				href='/dashboard/favorites'
				className={`${isActive('favorites') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
			>
				<Star className='h-5 w-5' />
				Favorites
			</Link>
			<Link
				href='/dashboard/trash'
				className={`${isActive('trash') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
			>
				<TrashIcon className='h-5 w-5' />
				Trash
			</Link>
		</nav>
	)
}
