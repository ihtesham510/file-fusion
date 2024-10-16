import ThemeSwitcher from './ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Sidebar } from 'lucide-react'
import PathDisplay from './PathDisplay'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
export default function Header() {
	return (
		<header className='flex justify-between items-center z-10 lg:z-0 backdrop-blur sticky lg:static top-0 w-full lg:h-[15vh] h-[10vh]'>
			<Button variant='outline' size='icon' className='lg:hidden ml-4'>
				<Sidebar />
			</Button>
			<h1 className='text-3xl font-supreme-bold-italic ml-4 hidden lg:block'>File Fusion</h1>
			<PathDisplay className='hidden lg:block text-2xl font-bold' />
			<Button variant='outline' size='sm' className='lg:hidden'>
				<OrganizationSwitcher
					afterCreateOrganizationUrl='/dashboard/allfiles'
					afterLeaveOrganizationUrl='/dashboard/allfiles'
				/>
			</Button>
			<div className='flex gap-4 mr-4 lg:w-[350px] items-center justify-end'>
				<Button variant='outline' size='sm' className='hidden lg:block'>
					<OrganizationSwitcher
						afterCreateOrganizationUrl='/dashboard/allfiles'
						afterLeaveOrganizationUrl='/dashboard/allfiles'
					/>
				</Button>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<UserButton />
				</Button>
				<span className='hidden lg:block'>
					<ThemeSwitcher />
				</span>
			</div>
		</header>
	)
}
