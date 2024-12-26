import React from 'react'
import { motion } from "framer-motion";
import { LampContainer } from './Lamp';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Categories from '../../Categories';
const LampEffect = () => {
  return (
    <LampContainer>
    <motion.h1
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className=" text-4xl lg:text-6xl tracking-tighter leading-wide text-center bg-clip-text bg-fuchsia-100 text-black "
    >
        Categories
    </motion.h1>
  </LampContainer>
  )
}

export default LampEffect