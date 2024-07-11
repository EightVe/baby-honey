import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AtSign, CircleX, Edit, Tag, TriangleAlert } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/lib/LoadingSpinner';
import { AuthContext } from '@/contexts/AuthContext';
import CustomLink from '@/hooks/CustomLink';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {user} = useContext(AuthContext)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.header 
        className="flex items-center justify-between pb-4 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CustomLink to="/settings">
          <div className="flex items-center space-x-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
            <h1 className="text-lg font-semibold">Settings</h1>
            <span className="text-sm text-gray-500">| View all settings</span>
          </div>
        </CustomLink>
      </motion.header>
      <motion.section
        className="mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-xl font-semibold" variants={itemVariants}>
          Profile
        </motion.h2>
        <motion.p className="text-sm text-gray-500" variants={itemVariants}>
          Edit your profile and everything that is visible to others
        </motion.p>
        <motion.div
          className="flex flex-col gap-4 justify-center items-center w-full"
          variants={itemVariants}
        >
          <Separator className="mt-6 w-1/3" />

          <motion.div className="w-full lg:w-1/3" variants={itemVariants}>
            <Card className="p-4 rounded-full">
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='h-12 w-12 rounded-full bg-black'></div>
                  <div>
                    <div className='flex items-center gap-1'><Label>{user.firstName}</Label><Label>{user.lastName}</Label></div>
                    <p className="text-gray-500 text-sm">{user.city || "Unknown"}, {user.country || "Unknown"}</p>
                  </div>
                </div>
                <div><Button size="sm" className="rounded-full">Change Picture</Button></div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div className="w-full lg:w-1/3" variants={itemVariants}>
            <Card className="p-4">
              <div>
                <Label className="flex items-center justify-between">Personal Information <Button className="flex items-center gap-1" variant="outline" onClick={() => setIsEditing(!isEditing)}><Edit className='h-4 w-4 text-gray-500' />Edit</Button></Label>
              </div>
              
              <AnimatePresence initial={false}>
                {isEditing ? (
                  <motion.div
                    key="inputs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-full">
                        <Label htmlFor="firstName" className="text-xs text-gray-500">First Name</Label>
                        <Input id="firstName" name="firstName" type="text" placeholder={user.firstName}/>
                      </div>
                      <div className="w-full">
                        <Label htmlFor="lastName" className="text-xs text-gray-500">Last Name</Label>
                        <Input id="lastName" name="lastName" type="text" placeholder={user.lastName} />
                      </div>
                      
                    </div>
                    <Separator className="mt-4"/>
                    <p className='flex items-center gap-1 text-gray-500 text-xs pt-3'><TriangleAlert className='h-4 w-4'/>The following informations cannot be updated.</p>
                    <div className="w-full bg-gray-100 p-2 rounded-md mt-2">
                        <Label htmlFor="lastName" className="text-xs text-gray-500">Username</Label>
                        <div className="relative">
        <Input 
          type="text" 
          value={user.username}
          className="pl-10" 
          disabled
        />
        <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
                      </div>

                    <div className="flex items-center gap-4 pt-2 bg-gray-100 p-2 rounded-md mt-2">
                      <div className="w-full">
                        <Label htmlFor="country" className="text-xs text-gray-500">Country</Label>
                        <Input id="country" name="country" type="text" disabled value="Istanbul"/>
                      </div>
                      <div className="w-full">
                        <Label htmlFor="city" className="text-xs text-gray-500">City</Label>
                        <Input id="city" name="city" type="text" disabled value="Turkey"/>
                      </div>
                      
                    </div>
                    
                    <Separator className="mt-4"/>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-full">
                        <Label htmlFor="phoneNumber" className="text-xs text-gray-500">Phone Number</Label>
                        <Input id="phoneNumber" name="phoneNumber" type="text" placeholder="04147***" />
                      </div>
                    </div>
                    <div>
                <div>
                <Label className="flex items-center justify-between mt-6">Bio</Label>
                <Textarea className="outline-none mt-1" placeholder=""/>
                </div>
              </div>
                    <div className="w-full mt-3" >
            <Button className="w-full" size="sm">Save Changes</Button>
          </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-full">
                        <Label className="text-xs text-gray-500">First Name</Label>
                        <p className="text-sm font-medium flex justify-between text-gray-600 items-center">{user.firstName}</p>
                      </div>
                      <div className="w-full">
                        <Label className="text-xs text-gray-500">Last Name</Label>
                        <p className="text-sm font-medium flex justify-between text-gray-600 items-center">{user.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-full">
                        <Label className="text-xs text-gray-500">City</Label>
                        <p className="text-sm font-medium flex justify-between text-gray-600 items-center">{user.city || "Unknown"}</p>
                      </div>
                      <div className="w-full">
                        <Label className="text-xs text-gray-500">Country</Label>
                        <p className="text-sm font-medium flex justify-between text-gray-600 items-center">{user.country || "Unknown"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-full">
                        <Label className="text-xs text-gray-500">Phone Number</Label>
                        <p className="text-sm font-medium flex justify-between text-gray-600 items-center">{user.phoneNumber || "Unknown"}</p>
                      </div>
                    </div>
                    <div>
                <Label className="flex items-center justify-between mt-6">Bio</Label>
                <p className="text-sm text-gray-500 mt-1">{user.bio || "No Bio Provided"}</p>
                </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default ProfileSettings;
