'use client'

import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbItem,
	BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function HeaderBreadCrumb() {
	const pathname = usePathname()
	const paths = pathname.split('/').filter(path => path !== '')

	const pathUrl = (index: number) => {
		return pathname
			.split('/')
			.slice(0, index + 2)
			.join('/')
	}
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{paths.map((path, index) => (
					<Link className='flex items-center gap-2' href={pathUrl(index)} key={index}>
						{index !== 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem
							className={`${index === paths.length - 1 && 'text-white'} text-xs lg:text-sm font-semibold`}
						>
							<BreadcrumbLink>{formatPathName(path)}</BreadcrumbLink>
						</BreadcrumbItem>
					</Link>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

function formatPathName(name: string) {
	return name
		.replace(/-/g, ' ')
		.split(' ')
		.map(c => c.replace(/\b\w/, char => char.toUpperCase()))
		.join(' ')
}
