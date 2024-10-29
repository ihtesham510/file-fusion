export default function Folder({ params: { folder } }: { params: { folder: string[] } }) {
	return <pre>{JSON.stringify(folder)}</pre>
}
