import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from "react-router-dom";
import SEO from '@/lib/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/lib/LoadingSpinner';
import WebBanner from '@/imgs/jsx/WebBanner';
import WebLogo from '@/imgs/jsx/WebLogo';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [loading,setLoading] =useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/verifications/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Password successfully reset.');
        navigate('/login');
        
      } else {
        toast.error(data.message);
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
        title="Eightve | Reset Password"
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
          <motion.div 
            className=''
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className='text-center pb-4'>
              <h1 className='text-3xl font-medium text-center'>Reset Password</h1>
              <p className='text-sm text-gray-500'>Please enter your new password!</p>
            </div>
            <div className='lg:px-32 px-14'>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <Input  disabled={loading} id="newPassword" type="password" placeholder="New Password" className="pl-10" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <div>
                  <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading && (<LoadingSpinner className="h-4 w-4 animate-spin mr-2"/>)}  Change Password
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

export default NewPassword;
