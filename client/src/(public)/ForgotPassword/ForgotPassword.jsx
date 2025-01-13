import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import SEO from '@/lib/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/lib/LoadingSpinner';
import WebBanner from '@/imgs/jsx/WebBanner';
import WebLogo from '@/imgs/jsx/WebLogo';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressSent, setEmailAddressSent] = useState(false);
  const [loading,setLoading] =useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { emailAddress };
    setLoading(true);
    try {
      const response = await fetch('/api/verifications/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setEmailAddressSent(true);
        setLoading(false)
      } else {
        toast.error(result.message)
        setLoading(false)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      setLoading(false)
    }
  };

  return (
    <>
      <SEO
        title="Eightve | Forgot Password"
        description=" friendly page for learning React Helmet."
        name="name."
        type="article"
      />
      <div className='h-screen w-full flex'>
        <div className='w-full flex flex-col justify-between'>
          <motion.div 
            className='flex justify-center items-center p-6'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
           <WebLogo />
          </motion.div>
          {emailAddressSent ? <motion.div 
            className=''
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className='w-full flex items-center justify-center flex-col gap-3'>
              <div className='p-2 bg-green-500 w-fit rounded-full'>
              <CheckCircle className='text-white h-8 w-8'/>
              </div>
<div className='flex items-center justify-center flex-col'>
<h1 className='font-medium text-xl'>Reset link sent successfully</h1>
<p className='text-gray-600 text-sm'>A reset link has been sent to your email please check your inbox and your spam folder.</p>
</div>
            </div>
            <div className='flex justify-center items-center'>
            <Separator className="mt-2 w-1/2"/>
            </div>
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="text-sm">
                <Link to="/signup" className="font-medium text-primary hover:text-primary/90 text-sm">
                  Sign Up
                </Link>
              </div>
              <div className='h-1 w-1 bg-black rounded-full'></div>
              <div className="text-sm">
                <Link to="/login" className="font-medium text-primary hover:text-primary/90 text-sm">
                  Log In
                </Link>
              </div>
            </div>
          </motion.div> : 
          <motion.div 
            className=''
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className='text-center pb-4'>
              <h1 className='text-3xl font-medium text-center'>Reset Password</h1>
              <p className='text-sm text-gray-500'>Forgot your password? No worries, we got you!</p>
            </div>
            <div className='lg:px-32 px-14'>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative mb-2">
                  <Input id="emailAddress" type="email" placeholder="Email address" className="pl-10" value={emailAddress} disabled={loading}
                    onChange={(e) => setEmailAddress(e.target.value)} />
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <div>
                  <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading && (<LoadingSpinner className="h-4 w-4 animate-spin mr-2"/>)}  Send Reset Link
                  </Button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="text-sm">
                <Link to="/signup" className="font-medium text-primary hover:text-primary/90 text-sm">
                  Sign Up
                </Link>
              </div>
              <div className='h-1 w-1 bg-black rounded-full'></div>
              <div className="text-sm">
                <Link to="/login" className="font-medium text-primary hover:text-primary/90 text-sm">
                  Log In
                </Link>
              </div>
            </div>
          </motion.div>
          }
          <motion.div 
            className='text-center py-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className='text-gray-600 text-sm'>©2025 Baby Honey. All Rights Reserved.</p>
          </motion.div>
        </div>
        <div 
          className='h-screen w-full rounded-tl-3xl rounded-bl-3xl hidden lg:block'
        >
          <WebBanner />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
