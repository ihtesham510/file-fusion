'use client'
import { ClerkLoaded, OrganizationProfile, useOrganization } from '@clerk/nextjs'
import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function OrganizationProfilePage() {
	const { organization } = useOrganization()
	return (
		<>
			<ClerkLoaded>
				<div className='relative w-full flex justify-center'>
					<div className='my-auto'>
						{!organization && (
							<div className='flex flex-col gap-10 justify-center text-primary/10 items-center size-auto'>
								<ShieldAlert className='size-36' />
								<div className='text-xl flex w-[400px]'>
									Please Switch to an organization or &nbsp;
									<Link href='/dashboard' className='hover:text-primary text-primary/25 underline underline-offset-2'>
										Go Back
									</Link>
								</div>
							</div>
						)}
						{organization && (
							<OrganizationProfile
								path='/dashboard/organization-profile'
								afterLeaveOrganizationUrl='/dashboard/organization-profile'
							/>
						)}
					</div>
				</div>
			</ClerkLoaded>
		</>
	)
}
