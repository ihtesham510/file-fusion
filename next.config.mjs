/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: removeHttp(process.env.NEXT_PUBLIC_CONVEX_URL),
			},
			{
				hostname: 'img.clerk.com',
			},
		],
	},
}

function removeHttp(url) {
	return url.replace(/^https?:\/\//, '')
}
export default nextConfig
