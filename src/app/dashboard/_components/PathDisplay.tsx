'use client'

import { useOrganization, useUser } from '@clerk/clerk-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PathDisplay(props: { className: string }) {
	const { organization } = useOrganization()
	const { user } = useUser()
	useEffect(() => {
		const favicon = document.querySelector("link[rel='icon']")
		if (favicon && user?.imageUrl) {
			favicon.setAttribute('href', user.imageUrl)
			document.title = 'Personal Account'
		}
		if (favicon && organization?.imageUrl) {
			favicon.setAttribute('href', organization.imageUrl)
			document.title = organization.name
		}
	}, [organization?.imageUrl, user?.imageUrl, organization?.name])
	const pathname = usePathname()
	const isActive = (path: string) => pathname.split('/').includes(path)
	if (isActive('allfiles')) return <h1 className={props.className}>All Files</h1>
	if (isActive('trash')) return <h1 className={props.className}>Trash</h1>
	if (isActive('favorites')) return <h1 className={props.className}>favorites</h1>
	return <></>
}
