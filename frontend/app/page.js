'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, List, Brain, Settings, User } from 'lucide-react';
import Link from 'next/link';

const Logo = () => (
  <div className="flex items-center">
    <Brain className="text-blue-500 mr-2" size={24} />
    <span className="text-lg font-bold">Intervuo</span>
  </div>
);

const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-20 bg-black bg-opacity-20">
    <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="mt-2 sm:mt-0 self-start">
        <ul className="flex flex-wrap sm:space-x-4">
          <li className="mr-3 mb-1 sm:mb-0"><Link href="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link></li>
          <li className="mr-3 mb-1 sm:mb-0"><Link href="/features" className="text-sm hover:text-blue-400 transition-colors">Features</Link></li>
          <li className="mr-3 mb-1 sm:mb-0"><Link href="/pricing" className="text-sm hover:text-blue-400 transition-colors">Pricing</Link></li>
          <li className="mr-3 mb-1 sm:mb-0"><Link href="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="absolute bottom-0 left-0 right-0 z-20 bg-black bg-opacity-20">
    <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="text-xs sm:text-sm mb-2 sm:mb-0">© 2024 Intervuo. All rights reserved.</div>
      <div className="flex space-x-4">
        <Link href="/settings" className="hover:text-blue-400 transition-colors">
          <Settings size={16} />
        </Link>
        <Link href="/profile" className="hover:text-blue-400 transition-colors">
          <User size={16} />
        </Link>
      </div>
    </div>
  </footer>
);

const ResponsiveAIAssistantPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative text-white flex items-center"
         style={{ backgroundImage: 'url("/1.jpg")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <Header />
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-lg">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-left"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Your AI Assistant Awaits
          </motion.h1>
          
          <motion.p
            className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-left"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Create your personalized AI companion with advanced voice recognition and intelligent learning capabilities. Provide knowledge data to craft custom agents tailored to your needs. Experience the future of digital assistance today.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-start"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Link href="/create-agent" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full flex items-center justify-center shadow-lg transition-colors text-sm sm:text-base"
              >
                <Plus className="mr-2" size={16} />
                Create Assistant
              </motion.button>
            </Link>
            <Link href="/my-agents" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full flex items-center justify-center shadow-lg transition-colors text-sm sm:text-base"
              >
                <List className="mr-2" size={16} />
                My Assistants
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResponsiveAIAssistantPage;