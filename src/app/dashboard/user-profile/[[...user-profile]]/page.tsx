'use client'
import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs'
import { LoaderCircle } from 'lucide-react'

export default function UserPorfile() {
	return (
		<>
			<ClerkLoading>
				<div className='h-[40vh] w-full flex justify-center items-center'>
					<LoaderCircle size={20} className='animate-spin' />
				</div>
			</ClerkLoading>
			<ClerkLoaded>
				<div className='relative w-full flex justify-center'>
					<div className='my-auto'>
						<UserProfile path='/dashboard/user-profile' />
					</div>
				</div>
			</ClerkLoaded>
		</>
	)
}
