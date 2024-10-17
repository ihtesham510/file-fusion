import useFiles from '@/hooks/use-files'

type UseFiles = ReturnType<typeof useFiles>
export type TypeFile = NonNullable<UseFiles['files']>[number]

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
