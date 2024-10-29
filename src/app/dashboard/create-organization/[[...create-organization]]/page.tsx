import { ClerkLoaded, CreateOrganization } from '@clerk/nextjs'

export default function CreateOrg() {
	return (
		<ClerkLoaded>
			<div className='w-full flex justify-center'>
				<div className='my-auto'>
					<CreateOrganization path='/dashboard/create-organization' afterCreateOrganizationUrl='/dashboard' />
				</div>
			</div>
		</ClerkLoaded>
	)
}
