import { ClerkLoaded } from '@clerk/nextjs'
import ProptectedComponent from '@/components/protected-component'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardSideBar from './_components/dashboard-sidebar'
import Header from './_components/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkLoaded>
			<ProptectedComponent>
				<SidebarProvider defaultOpen>
					<DashboardSideBar />
					<SidebarInset>
						<Header />
						<div className='w-full grid relative h-full'>{children}</div>
					</SidebarInset>
				</SidebarProvider>
			</ProptectedComponent>
		</ClerkLoaded>
	)
}
