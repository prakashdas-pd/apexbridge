'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <motion.div 
        className="relative w-12 h-12"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image
          src="/Apexbridgelogo.jpg"
          alt="Apex Bridge Solutions Logo"
          fill
          className="object-contain drop-shadow-lg"
          priority
        />
      </motion.div>
      <div className="flex flex-col">
        <motion.span 
          className="text-xl font-bold text-foreground leading-tight"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          APEX
        </motion.span>
        <motion.span 
          className="text-xs text-muted-foreground leading-tight group-hover:text-primary transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          BRIDGE SOLUTIONS
        </motion.span>
      </div>
    </Link>
  )
}
