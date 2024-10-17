import useFiles from '@/hooks/use-files'

type UseFiles = ReturnType<typeof useFiles>
export type TypeFile = NonNullable<UseFiles['files']>[number]
