/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      //   {
      //     source: "/auth/:action/:token",
      //     destination: "/account?action=:action&token=:token",
      //     permanent: true,
      //   },
    ];
  },
};

module.exports = nextConfig;
