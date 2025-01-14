import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import DotPattern from "./DotPattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from "./ui/NeonEffect";
import HomeBanner from '../../../imgs/IMG_6869.mp4'
export const SmoothScrollHero = () => {
  return (

    <div className="bg-fuchsia-100">


        <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        
        <Nav />



        <HeroBanner />
      </ReactLenis>


    </div>


  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
     
    </nav>
  );
};

const SECTION_HEIGHT = 2500;

const HeroBanner = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >

      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 " />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <>


<motion.div
  className="sticky top-0 h-screen w-full"
  style={{
    clipPath,
    backgroundSize,
    opacity,
  }}
>
    



<div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">




<motion.h1

initial={{ y: 48, opacity: 0 }}
whileInView={{ y: 0, opacity: 1 }}
transition={{ ease: "easeInOut", duration: 0.75 }}
className="capitalize z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white "
>
Creating Magical Memories <br /> for Your Little One
</motion.h1>
<motion.h1
initial={{ y: 48, opacity: 0 }}
whileInView={{ y: 0, opacity: 1 }}
transition={{ ease: "easeInOut", duration: 1.25 }}
className=" flex z-10 items-center whitespace-pre-wrap justify-center gap-2 text-xl capitalize text-white tracking-tight pt-4 text-center"
>
<a href="/#categories" className="flex items-center"><ArrowDown className="h-5 w-5"/>  Scroll Down <ArrowDown className="h-5 w-5"/></a>
</motion.h1>


<video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source
      src={HomeBanner}
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>

</div>

</motion.div>



</>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/0c4eaa43-35ae-45bd-bf0b-f6f18f26d04f.jpg?alt=media&token=9ef58ce1-e32a-4af2-983b-32f3390f7a14"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/1a9f3833-b763-4d93-b029-4c273c1fdb07.jpg?alt=media&token=1ce69bb1-486a-48a5-adb8-4364c4fcfa91"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/37172e66-c5ab-4d1b-9413-aae951b13855.jpg?alt=media&token=6923977f-4773-4f22-a851-1b856ff8bb29"
        alt="Orbiting satellite"
        start={-200}
        end={-200}
        className="ml-auto ml-46 w-1/3 object-cover h-auto"
      />
      <ParallaxImg
        src="https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/photo_2025-01-14_00-53-47.jpg?alt=media&token=de6ca459-2ce6-4cd5-a1ec-711f0a247d68"
        alt="Orbiting satellite"
        start={-200}
        end={-800}
        className="ml-24 w-5/12 h-[250px] object-cover"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
