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
      label: "Retirement",
      href: "/retirement",
    }
    // {
    //   label: "Docs",
    //   href: "/docs",
    // },
    // {
    //   label: "About",
    //   href: "/about",
    // },
  ],
  links: {
    github: "https://github.com/kepatotorica",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
