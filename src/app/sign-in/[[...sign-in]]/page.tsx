import { SignIn } from '@clerk/nextjs'

export default function Sign_in() {
	return (
		<div className='flex h-screen w-full justify-center items-center'>
			<SignIn />
		</div>
	)
}
