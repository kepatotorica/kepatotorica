export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Kepa Totorica",
  description: "Personal Website",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Wordle",
      href: "/wordle",
    },
    {
      label: "Retirement Calc",
      href: "/retirement",
    },
    {
      label: "Insurance Calc",
      href: "/insurance"

    }
  ],
  links: {
    github: "https://github.com/kepatotorica",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
