import { PropsWithChildren } from 'react'
import Header from './_components/Header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			<div></div>
			<ScrollArea className='lg:h-[80vh] w-full h-auto'>
				<div className='gap-4 sm:grid-cols-2 lg:grid-cols-3 grid grid-cols-1'>{children}</div>
			</ScrollArea>
		</div>
	)
}
