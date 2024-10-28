'use client'

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, UserIcon, LogOut } from 'lucide-react'
import useUser from '@/hooks/use-user'
import Link from 'next/link'
import { useClerk } from '@clerk/nextjs'

export default function SideBarProfileButton() {
	const user = useUser()
	const { signOut } = useClerk()
	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={user?.imageUrl} />
									<AvatarFallback className='rounded-lg'>FF</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>
										{user?.username ?? user?.first_name ?? user?.last_name}
									</span>
									<span className='truncate text-xs'>{user?.email}</span>
								</div>
								<ChevronsUpDown className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
							side='top'
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage src={user?.imageUrl} />
										<AvatarFallback className='rounded-lg'>FF</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>
											{user?.username ?? user?.first_name ?? user?.last_name}
										</span>
										<span className='truncate text-xs'>{user?.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<Link href='/dashboard/user-profile'>
									<DropdownMenuItem className='flex gap-2'>
										<UserIcon className='size-4' />
										Profile
									</DropdownMenuItem>
								</Link>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='flex gap-2' onClick={() => signOut()}>
								<LogOut className='size-4' />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	)
}
