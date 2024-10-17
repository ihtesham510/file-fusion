import { PropsWithChildren } from 'react'
import Header from './_components/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { ArrowDownWideNarrow, ListFilter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import Links from './_components/Links'
import UploadFileDialog from './_components/upload-dialog'

export default function Dashboard_Layout({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			<div className='h-[10vh] w-full justify-between items-center flex'>
				<div className='relative hidden sm:block ml-4'>
					<Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />

					<Input placeholder='Search' className='pl-8 sm:[w-300px] md:w-[400px]' />
				</div>
				<div className='flex gap-2 mr-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm' className='h-8 gap-1'>
								<ArrowDownWideNarrow className='h-3.5 w-3.5' />
								<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem>All Files</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm' className='h-8 gap-1'>
								<ListFilter className='h-3.5 w-3.5' />
								<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Sort</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Sort by</DropdownMenuLabel>
							<DropdownMenuSeparator />
						</DropdownMenuContent>
					</DropdownMenu>
					<UploadFileDialog>
						<Button>Upload File</Button>
					</UploadFileDialog>
				</div>
			</div>
			<div className='flex'>
				<div className='w-[310px]'>
					<div className='ml-4 mt-4'>
						<Links />
					</div>
				</div>
				<ScrollArea className='lg:h-[75vh] w-full h-auto'>{children}</ScrollArea>
			</div>
		</div>
	)
}
