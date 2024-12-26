import React from 'react'
import { BentoCard, BentoGrid } from "../components/ui/BentoGrid";
import { BellIcon } from 'lucide-react';
import { NeonGradientCard } from './ui/NeonEffect';
import LampEffect from './ui/Lamp/LampEffect';
const Categories = () => {

    const features = [
        {
            name: "Baby Shooting",
            description:
              "Get notified when someone shares a file or mentions you in a comment.",
            href: "/",
            cta: "Learn more",
            background: <img src='https://images.pexels.com/photos/26337017/pexels-photo-26337017/free-photo-of-baby-girl-sitting-on-a-feeding-chair-with-a-toy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="absolute opacity-60 object-cover" />,
            className: "col-span-3 lg:col-span-2",
          },
          {
            name: "Smash Cake",
            description:
              "Get notified when someone shares a file or mentions you in a comment.",
            href: "/",
            cta: "Learn more",
            background: <img src='https://images.pexels.com/photos/26337017/pexels-photo-26337017/free-photo-of-baby-girl-sitting-on-a-feeding-chair-with-a-toy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="absolute opacity-60 object-cover" />,
            className: "col-span-3 lg:col-span-2",
          },
          {
            name: "Pregnant Shooting",
            description:
              "Get notified when someone shares a file or mentions you in a comment.",
            href: "/",
            cta: "Learn more",
            background: <img src='https://images.pexels.com/photos/26337017/pexels-photo-26337017/free-photo-of-baby-girl-sitting-on-a-feeding-chair-with-a-toy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="absolute opacity-60 object-cover" />,
            className: "col-span-3 lg:col-span-2",
          },
      ];


  return (
<div className='px-4 md:px-8 lg:px-24 bg-fuchsia-100'>
<BentoGrid className="grid lg:grid-cols-4">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
</div>
  )
}

export default Categories