/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/:action/:token",
        destination: "/account?action=:action&token=:token/ballhlahsdlfkasdjf",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
