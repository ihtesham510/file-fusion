import { Button } from '@/components/ui/button'
import { ClerkLoaded, CreateOrganization } from '@clerk/nextjs'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function CreateOrg() {
	return (
		<ClerkLoaded>
			<div className='relative w-full flex justify-center'>
				<div className='my-auto'>
					<CreateOrganization path='/dashboard/create-organization' afterCreateOrganizationUrl='/dashboard/allfiles' />
				</div>
				<Link href='/dashboard/allfiles' className='absolute top-5 left-5 hidden lg:block'>
					<Button>
						<ArrowLeftIcon />
					</Button>
				</Link>
			</div>
		</ClerkLoaded>
	)
}
