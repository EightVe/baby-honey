import React from 'react'
import { useState } from "react"
import { motion } from "framer-motion"
import { IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
const ContactArea = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => setIsExpanded(!isExpanded)
  
    const socialLinks = [
      { name: "Instagram", icon: IconBrandInstagram, url: "https://www.instagram.com/youraccount" },
      { name: "WhatsApp", icon: IconBrandWhatsapp, url: "https://wa.me/yournumber" },
    ]
  return (
<motion.footer
      className="text-black p-4 py-7"
      initial={{ height: "60px" }}
      animate={{ height: isExpanded ? "auto" : "60px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl uppercase">Get in touch with us!</h2>
          <Button
            variant="transparent"
            size="sm"
            onClick={toggleExpand}
            className="text-blcak hover:bg-white/20"
          >
            {isExpanded ? "Close" : "Contact"}
          </Button>
        </div>
        <motion.div
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4  rounded-lg  transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="w-8 h-8 mr-3" />
              <span className="text-lg uppercase">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default ContactArea