import { TypeFile, TypeFolder } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import {
	DownloadIcon,
	EllipsisVertical,
	FileArchive,
	FileCode2,
	FileIcon,
	FileJson2,
	FileSpreadsheet,
	FileText,
	FolderIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export default function FileCard({ file, folder }: { file?: TypeFile; folder?: TypeFolder }) {
	return (
		<Card>
			<CardHeader>
				<div className='flex justify-between'>
					<CardTitle className='overflow-hidden text-ellipsis whitespace-nowrap h-9 w-[290px]'>
						{file?.file_name ?? folder?.name}
					</CardTitle>
					<div>
						<EllipsisVertical className='cursor-pointer p-1 size-6 rounded-full hover:bg-primary-foreground' />
					</div>
				</div>
				<CardDescription className='flex justify-between'>
					<p>{file?.file_type}</p>
					{/* <p>{`On ${new Date(file?._creationTime || folder?._creationTime).toLocaleDateString()} At ${new Date(file!._creationTime ?? folder!._creationTime).toLocaleTimeString()}`}</p> */}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{file && <FileCover fileType={file?.file_type} url={file?.file_url} />}
				{folder && (
					<div className='h-56 w-full flex justify-center items-center'>
						<FolderIcon className='size-28' />
					</div>
				)}
			</CardContent>
			{file && (
				<CardFooter>
					{file?.org && (
						<div className='flex items-center gap-3 w-full'>
							<Avatar>
								<AvatarImage src={file?.user.imageUrl} />
								<AvatarFallback>{file?.user.username ?? file.user.first_name}</AvatarFallback>
							</Avatar>
							<span>{file?.user.username ?? file?.user.first_name}</span>
						</div>
					)}
					<Button className='flex gap-1' size='sm'>
						<DownloadIcon className='size-4' />
						<p>Download</p>
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}

function FileCover({ fileType, url }: { fileType: string; url: string }) {
	const className = 'h-40 w-full flex items-center justify-center'
	switch (fileType) {
		case 'JS':
			return (
				<div className={className}>
					<FileCode2 className='size-14' />
				</div>
			)
		case 'TS':
			return (
				<div className={className}>
					<FileCode2 className='size-14' />
				</div>
			)
		case 'PDF':
			return (
				<div className={className}>
					<FileIcon className='size-14' />
				</div>
			)
		case 'CSV':
			return (
				<div className={className}>
					<FileSpreadsheet className='size-14' />
				</div>
			)
		case 'JSON':
			return (
				<div className={className}>
					<FileJson2 className='size-14' />
				</div>
			)
		case 'TEXT/PLAIN':
			return (
				<div className={className}>
					<FileText className='size-14' />
				</div>
			)
		case 'ZIP':
			return (
				<div className={className}>
					<FileArchive className='size-14' />
				</div>
			)
		case 'DOC/DOCX':
			return (
				<div className={className}>
					<FileText className='size-14' />
				</div>
			)
		case 'PNG/JPEG':
			return (
				<div className='h-40 overflow-hidden rounded-md relative'>
					<Image src={url} alt='image' fill className='object-cover rounded-md' />
				</div>
			)
		default:
			return <Skeleton className={className} />
	}
}
