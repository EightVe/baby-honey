import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from './ui/NeonEffect';
import AnimatedShinyText from './ui/AnimatedShinyText';
import DotPattern from './DotPattern';

const AboutUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: false, threshold: 0.2 });
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
        },
      },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
  return (
    <div className="relative bg-fuchsia-50  flex-col overflow-hidden text-black h-screen py-4 w-full flex items-center justify-center px-6 md:px-10">
        <div className="z-10 h-screen  text-black flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <div className="z-10 flex items-center justify-center">
              <div
                className={cn(
                  "group rounded-full bg-blue-100 text-base text-gray-800 transition-all ease-in",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out">
                  <span className='text-gray-800'>About Us</span>
                </AnimatedShinyText>
                <div>

                </div>
              </div>
            </div>
          </header>
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div>
              <motion.h2 
                className="text-gray-800 text-5xl tracking-tighter leading-wide mb-2"
                variants={itemVariants}
              >
                Get to know us more!
              </motion.h2>
              <motion.p 
                className="text-base mb-4 text-gray-800 pt-6"
                variants={itemVariants}
              >
                Get started in less than 5 minutes with easy three steps to integrate reviews on your website!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa eveniet eum repellat dignissimos dolor repellendus porro corrupti expedita, at, temporibus impedit ducimus rem obcaecati commodi dolore cumque voluptatum consequuntur perferendis.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus itaque reiciendis quaerat omnis dolorum eveniet perspiciatis dignissimos, eligendi fuga dolore temporibus id, ea, nam sint rem corporis nesciunt delectus nobis?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia natus sapiente mollitia labore, ipsam, qui voluptates quaerat cum fuga iste enim laudantium veritatis inventore, reprehenderit perspiciatis sed fugit repellat vel!
              </motion.p>

            </div>
            <div 

              className="lg:flex lg:items-center lg:justify-center"
            >
              <NeonGradientCard>
              <video
    className="h-auto w-full rounded-lg"
    autoPlay
    muted
    loop
    playsInline
  >
    <source
      src="https://assets.mixkit.co/videos/24898/24898-720.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
              </NeonGradientCard>
            </div>
          </motion.div>
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}/>
    </div>


  )
}

export default AboutUs