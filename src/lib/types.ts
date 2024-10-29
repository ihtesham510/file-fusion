import useFiles from '@/hooks/use-files'
import useFolder from '@/hooks/use-folder'

type UseFiles = ReturnType<typeof useFiles>
export type TypeFile = NonNullable<UseFiles['files']>[number]

type UseFolder = ReturnType<typeof useFolder>
export type TypeFolder = NonNullable<UseFolder>[number]

export type TypesofFile =
	| undefined
	| 'PDF'
	| 'JS'
	| 'JSON'
	| 'TS'
	| 'DOC/DOCX'
	| 'PNG/JPEG'
	| 'CSV'
	| 'TEXT/PLAIN'
	| 'ZIP'
export type SortType = 'AlphDes' | 'AlphAcen' | 'CreatedAcen' | 'CreatedDec'
