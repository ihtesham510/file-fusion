'use client'
import useFiles from '@/hooks/use-files'
import FileCard from '../_components/file-card'

export default function () {
	const { files } = useFiles()
	return files?.map(file => <FileCard key={file._id} file={file} />)
}
