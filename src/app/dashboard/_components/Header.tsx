import { BellIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import HeaderBreadCrumb from './header-bread-crumb'

export default function Header() {
	return (
		<header className='flex m-5 gap-4 justify-between items-center'>
			<div className='flex gap-4 items-center'>
				<SidebarTrigger />
				<Separator orientation='vertical' className='mr-2 h-4' />
				<HeaderBreadCrumb />
			</div>
			<Button variant='outline' size='icon' className='rounded-full'>
				<BellIcon />
			</Button>
		</header>
	)
}
