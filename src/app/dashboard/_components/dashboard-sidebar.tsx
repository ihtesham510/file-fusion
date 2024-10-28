import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import ClerkOrganizationSwitcher from '@/components/clerk-organization-switcher'
import Links from './Links'
import { Label } from '@/components/ui/label'
import ThemeSwitcher from './ThemeSwitcher'
import SideBarProfileButton from './sidebar-profile-button'

export default function DashboardSideBar() {
	return (
		<Sidebar variant='inset'>
			<SidebarHeader>
				<ClerkOrganizationSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigate</SidebarGroupLabel>
					<SidebarGroupContent>
						<Links />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem className='flex justify-between items-center mx-2'>
						<Label htmlFor='airplane-mode'>Dark Mode</Label>
						<ThemeSwitcher />
					</SidebarMenuItem>
				</SidebarMenu>
				<SideBarProfileButton />
			</SidebarFooter>
		</Sidebar>
	)
}
