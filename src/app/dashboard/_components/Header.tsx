import { BellIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Header() {
	return (
		<header className='flex m-5 gap-4 justify-between items-center'>
			<div className='flex gap-4 items-center'>
				<SidebarTrigger />
				<Separator orientation='vertical' className='mr-2 h-4' />
				<Breadcrumb>
					<BreadcrumbList>
						{/* ... */}
						<BreadcrumbItem>
							<BreadcrumbEllipsis />
						</BreadcrumbItem>
						{/* ... */}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<Button variant='outline' size='icon' className='rounded-full'>
				<BellIcon />
			</Button>
		</header>
	)
}
