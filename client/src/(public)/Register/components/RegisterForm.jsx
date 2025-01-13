import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/lib/LoadingSpinner';

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const generateUsername = (firstName, lastName) => {
    const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a 3-digit number
    return `${firstName}${lastName[0]}${randomDigits}`;
  };

  const validateForm = () => {
    const { firstName, lastName, emailAddress, password, confirmPassword } = formData;
    if (!firstName || !lastName || !emailAddress || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      toast.error("Invalid email address");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const username = generateUsername(formData.firstName, formData.lastName);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, username }),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        toast.error("An Error Occurred");
        return;
      }
      setLoading(false);
      toast.success("Account Created Successfully.");
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <motion.form
      className="flex flex-col gap-4 w-[350px] "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
<div className='flex gap-2 items-center'>      <div className="relative w-full">
        <Input disabled={loading} id="firstName" name="firstName" type="text" placeholder="First Name" className="pl-10 w-full" onChange={handleChange} />
        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      <div className="relative w-full">
        <Input disabled={loading} id="lastName" name="lastName" type="text" placeholder="Last Name" className="pl-10 w-full" onChange={handleChange} />
        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div></div>
      <div className="relative">
        <Input disabled={loading} id="emailAddress" type="email" name="emailAddress" placeholder="Email address" className="pl-10" onChange={handleChange} />
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      <div className='flex gap-2 items-center'>  
      <div className="relative w-full">
        <Input disabled={loading} id="password" type="password" name="password" placeholder="Password" className="pl-10 w-full" onChange={handleChange} />
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      <div className="relative w-full">
        <Input disabled={loading} id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" className="pl-10 w-full" onChange={handleChange} />
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      </div>
      <div>
        <Button type="submit" className="w-full rounded-full" disabled={loading}>
        {loading && (
              <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          Sign Up
        </Button>
      </div>
    </motion.form>
  );
}

export default RegisterForm;
