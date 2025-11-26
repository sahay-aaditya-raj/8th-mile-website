import { cn } from "@/lib/utils"
// import { Marquee } from "@/registry/magicui/marquee"
import { Marquee } from "./ui/marquee"

const sponsors = [
    { img: "https://avatar.vercel.sh/jack" },
    { img: "https://avatar.vercel.sh/jill" },
    { img: "https://avatar.vercel.sh/john" },
    { img: "https://avatar.vercel.sh/jane" },
    { img: "https://avatar.vercel.sh/jenny" },
    { img: "https://avatar.vercel.sh/james" },
];

const firstRow = sponsors.slice(0, sponsors.length / 2);
const secondRow = sponsors.slice(sponsors.length / 2);


const SponsorLogoCard = ({ img }: { img: string }) => {
    return (
        <div
            className={cn(
                "relative h-36 w-36 flex items-center justify-center rounded-full overflow-hidden",
                "bg-gray-950/[.03] hover:bg-gray-950/[.08]",
                "dark:bg-gray-50/[.08] dark:hover:bg-gray-50/[.12]"
            )}
        >
            <img
                src={img}
                alt="sponsor-logo"
                className="h-full w-full object-contain rounded-full"
            />
        </div>
    );
};


export function MarqueeDemo() {
    return (
        <div className="relative flex w-screen flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((s, idx) => (
                    <SponsorLogoCard key={idx} img={s.img} />
                ))}
            </Marquee>

            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((s, idx) => (
                    <SponsorLogoCard key={idx} img={s.img} />
                ))}
            </Marquee>

            {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div> */}
            {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div> */}
        </div>
    );
}
