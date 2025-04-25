"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Image from "next/image";
import logo from "../../public/8thmilelogocolour.png";

export default function ThreeDMarqueeDemo() {
    const images = [
        "https://assets.aceternity.com/animated-modal.png",
        "https://assets.aceternity.com/animated-testimonials.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
        "https://assets.aceternity.com/github-globe.png",
        "https://assets.aceternity.com/glare-card.png",
        "https://assets.aceternity.com/layout-grid.png",
        "https://assets.aceternity.com/flip-text.png",
        "https://assets.aceternity.com/hero-highlight.png",
        "https://assets.aceternity.com/carousel.webp",
        "https://assets.aceternity.com/placeholders-and-vanish-input.png",
        "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
        "https://assets.aceternity.com/signup-form.png",
        "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
        "https://assets.aceternity.com/spotlight-new.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
        "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
        "https://assets.aceternity.com/tabs.png",
        "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
        "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
        "https://assets.aceternity.com/glowing-effect.webp",
        "https://assets.aceternity.com/hover-border-gradient.png",
        "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
        "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
        "https://assets.aceternity.com/macbook-scroll.png",
        "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
        "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
        "https://assets.aceternity.com/multi-step-loader.png",
        "https://assets.aceternity.com/vortex.png",
        "https://assets.aceternity.com/wobble-card.png",
        "https://assets.aceternity.com/world-map.webp",
    ];
    return (
        <div className="mx-auto bg-black">
            <div className="opacity-30 fixed top-0 left-0 w-full h-full z-0">
                <ThreeDMarquee className="h-full w-full" images={images} />
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center h-screen w-full">
                <div className="text-7xl md:text-[220px] font-bold flex flex-row items-end">
                    <Image src={logo} alt="logo" width={300} height={600} className="hidden md:flex" />
                    <Image src={logo} alt="logo" width={100} height={200} className="md:hidden" />
                    <div className="text-white">Mile</div>
                </div>
                <p className="max-w-2xl text-2xl md:text-5xl mt-8 font-sans text-center fraunces text-[#f9dd9c]">
                    Are you ready to be a part of <span className="font-semibold text-[#e90c00] fraunces">Bengaluru&apos;s </span> biggest <span className="font-semibold  fraunces">techno-cultural extravaganza</span>
                </p>
            </div>
            <div className="relative z-10 bg-black py-24 px-24 z-10">
                <div className="samarkan text-[#418b24] text-7xl border-b-2 w-fit border-[#e90c00]">About</div>
                <div className="fraunces text-2xl">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur est delectus aliquid fugit vitae maiores voluptatibus natus rem quis dolorem saepe praesentium optio nobis reprehenderit vero ut dolorum, consequuntur assumenda voluptates perspiciatis totam voluptate eveniet! Maxime beatae quaerat possimus et quae mollitia repellat ad eos quo dicta impedit quam eveniet totam quia veritatis quos corporis, omnis dolorum est temporibus quibusdam assumenda quod vitae. Repellat, similique minima voluptatem fugiat praesentium amet optio. Eligendi maxime sit fugit totam adipisci facere enim qui, et beatae quo odio non officia nam deleniti accusamus, veritatis quasi? Nemo iure a animi quaerat eaque. Ea quod minima error vitae odio, reiciendis similique cum dolore quo qui at, illum voluptate. Excepturi, recusandae. Officia perspiciatis voluptate dignissimos molestias pariatur deserunt sapiente, corrupti quo labore quidem eum, fugit culpa optio similique neque! Nostrum est dolor quia sunt fuga repudiandae harum tenetur consectetur quasi. Blanditiis, a soluta eligendi earum quae nostrum?
                </div>
            </div>
            <div className="relative z-10 bg-black py-24 px-24">
                <div className="flex justify-end w-full">
                    <div className="samarkan text-[#418b24] text-7xl border-b-2 w-fit border-[#e90c00]">Vision</div>
                </div>
                <div className="fraunces text-2xl">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur est delectus aliquid fugit vitae maiores voluptatibus natus rem quis dolorem saepe praesentium optio nobis reprehenderit vero ut dolorum, consequuntur assumenda voluptates perspiciatis totam voluptate eveniet! Maxime beatae quaerat possimus et quae mollitia repellat ad eos quo dicta impedit quam eveniet totam quia veritatis quos corporis, omnis dolorum est temporibus quibusdam assumenda quod vitae. Repellat, similique minima voluptatem fugiat praesentium amet optio. Eligendi maxime sit fugit totam adipisci facere enim qui, et beatae quo odio non officia nam deleniti accusamus, veritatis quasi? Nemo iure a animi quaerat eaque. Ea quod minima error vitae odio, reiciendis similique cum dolore quo qui at, illum voluptate. Excepturi, recusandae. Officia perspiciatis voluptate dignissimos molestias pariatur deserunt sapiente, corrupti quo labore quidem eum, fugit culpa optio similique neque! Nostrum est dolor quia sunt fuga repudiandae harum tenetur consectetur quasi. Blanditiis, a soluta eligendi earum quae nostrum?
                </div>
            </div>
        </div>
    );
}
