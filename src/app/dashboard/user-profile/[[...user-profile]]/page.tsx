'use client'
import { Button } from '@/components/ui/button'
import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs'
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react'
import Link from 'next/link'

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
					<Link href='/dashboard/allfiles' className='absolute top-5 left-5 hidden lg:block'>
						<Button>
							<ArrowLeftIcon />
						</Button>
					</Link>
				</div>
			</ClerkLoaded>
		</>
	)
}
