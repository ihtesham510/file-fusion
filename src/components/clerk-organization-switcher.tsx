'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import useUser from '@/hooks/use-user'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { ArrowLeftRight, ChevronsUpDown, Plus, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ClerkOrganizationSwitcher() {
	const { organization } = useOrganization()
	const user = useUser()
	const { setActive, userMemberships } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	})

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<div className='flex aspect-square size-8 relative items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
								{organization ? (
									<Image className='size-4 rounded-md' fill src={organization.imageUrl} alt='organization logo/image' />
								) : (
									<>
										{user && (
											<Image className='size-4 rounded-md' fill src={user.imageUrl} alt='organization logo/image' />
										)}
									</>
								)}
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>{organization?.name ?? 'Personal Account'}</span>
								<span className='truncate text-xs'>{organization?.getRoles.name}</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						align='start'
						side='bottom'
						sideOffset={4}
					>
						<DropdownMenuLabel className='text-xs text-muted-foreground'>Organization</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => setActive && setActive({ organization: null })}
							className='gap-2 p-2 cursor-pointer'
							disabled={!organization}
						>
							<div className='flex size-6 items-center justify-center rounded-sm border relative gap-2'>
								{user && <Image className='size-4 shrink-0' src={user!.imageUrl} alt='ornagization image' fill />}
							</div>
							Personal Account
							<DropdownMenuShortcut>
								<ArrowLeftRight className='size-4' />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
						{userMemberships.data?.map((mem, index) => (
							<DropdownMenuItem
								disabled={organization && organization.id === mem.organization.id ? true : false}
								key={index}
								onClick={() =>
									setActive &&
									setActive({
										organization: mem.organization.id,
									})
								}
								className='gap-2 p-2 cursor-pointer'
							>
								<div className='flex size-6 items-center justify-center rounded-sm border gap-2 relative'>
									<Image className='size-4 shrink-0' src={mem.organization.imageUrl} alt='ornagization image' fill />
								</div>
								{mem.organization.name}
								<DropdownMenuShortcut>
									<ArrowLeftRight className='size-4' />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href='/dashboard/create-organization' className='flex items-center gap-2'>
								<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
									<Plus className='size-4' />
								</div>
								<div className='font-medium text-muted-foreground'>Create Organization</div>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem disabled={!organization}>
							<Link href='/dashboard/organization-profile' className='flex items-center gap-2'>
								<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
									<SettingsIcon className='size-4' />
								</div>
								<div className='font-medium text-muted-foreground'>Manage Organization</div>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
