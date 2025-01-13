import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from './components/LoginForm';
import { Link } from "react-router-dom";
import SEO from '@/lib/SEO';
import { Button } from '@/components/ui/button';
import WebBanner from '@/imgs/jsx/WebBanner';
import WebLogo from '@/imgs/jsx/WebLogo';

const Login = () => {
  return (
    <>
      <SEO
        title="Eightve | Log In"
        description=" friendly page for learning React Helmet."
        name=" name."
        type="article"
      />
      <div className='h-screen w-full flex absolute z-30 justify-center'>
        <div className='w-full flex flex-col justify-between items-center'>
          <motion.div 
            className='flex justify-center items-center p-6'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
          <motion.div 
            className='bg-fuchsia-50/50 p-2 rounded-xl py-6'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className='text-center pb-4 flex items-center flex-col'>
              <h1 className='text-3xl font-medium text-center flex gap-1'>            <WebLogo />Welcome Back</h1>
              <p className='text-sm text-gray-500'>Sign in to your account</p>
            </div>
            <div className='lg:px-32 px-14'>
              <LoginForm />
            </div>
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="text-sm">
                <Link to="/signup" className="font-medium text-primary hover:text-primary/90 text-sm">
                  Sign Up
                </Link>
              </div>
              <div className='h-1 w-1 bg-black rounded-full'></div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/90 text-sm">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className='text-center py-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className='text-gray-600 text-sm'>©2025 Baby Honey. All Rights Reserved.</p>
          </motion.div>
        </div>
      </div>
        <div 
          className='h-screen w-full absolute z-10'
        >
          <WebBanner />
        </div>
    </>
  )
}

export default Login;
