'use client'
import useFiles from '@/hooks/use-files'
import FileCard from '../_components/file-card'
import { LoaderCircleIcon } from 'lucide-react'

export default function AllFiles() {
	const { files } = useFiles()
	if (!files)
		return (
			<div className='w-full h-[500px] flex justify-center items-center'>
				<LoaderCircleIcon size={30} className='animate-spin' />
			</div>
		)
	return (
		<div className='gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 mx-4'>
			{files?.map(file => <FileCard key={file._id} file={file} />)}
		</div>
	)
}
