import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>A collection of tools made by <span className={title({ color: "violet" })}>Kepa Totorica</span> for easy online access at any time</h1>
        {/* Hi! My name is Kepa Totorica I love to develop software and play games.
        This is a collection of tools I wrote that I wanted easy access too. Originally most of these apps were just console
        applications on my local computer, but I got tired of not having access to them anywhere so figured it was time to port them to an offical website.
        It also helps that I love to tinker with software and I get immense satisfaction from creating things. If you have any tools you would like to see created
        please throw me an email at kepatoto on gmail and if I like it I will consider implementing it! */}
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "shadow", radius: "full", color: "primary" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
