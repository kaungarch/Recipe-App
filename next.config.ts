/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
                pathname: "/recipe-images/**",
            },
        ],
        minimumCacheTTL: 60,
    },
};

export default nextConfig;
