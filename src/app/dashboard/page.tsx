'use client'
import useFiles from '@/hooks/use-files'
import { LoaderCircleIcon } from 'lucide-react'
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
import useFolder from '@/hooks/use-folder'
import FileCard from './_components/file-card'
import UploadFileDialog from './_components/upload-dialog'
export default function Dashboard() {
	const { files } = useFiles()
	const folders = useFolder()
	if (!files)
		return (
			<div className='w-full h-[500px] flex justify-center items-center'>
				<LoaderCircleIcon size={30} className='animate-spin' />
			</div>
		)
	return (
		<>
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
			<ScrollArea className='lg:h-[70vh] w-full h-auto'>
				<div className='gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 m-4'>
					{folders?.map(folder => <FileCard key={folder._id} folder={folder} />)}
					{files?.map(file => <FileCard key={file._id} file={file} />)}
				</div>
			</ScrollArea>
		</>
	)
}
