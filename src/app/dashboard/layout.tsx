import { PropsWithChildren } from 'react'
import { ClerkLoaded } from '@clerk/nextjs'
import ProptectedComponent from '@/components/protected-component'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardSideBar from './_components/dashboard-sidebar'
import Header from './_components/Header'

export default function Dashboard_Layout({ children }: PropsWithChildren) {
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
