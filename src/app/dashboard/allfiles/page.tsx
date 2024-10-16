import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'

export default function () {
	return (
		<div>
			<UserButton />
			<OrganizationSwitcher />
		</div>
	)
}
