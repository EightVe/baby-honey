import React, { useContext } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Settings from '@/(protected)/Settings/Settings'
import { AuthContext } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'
import CustomLink from '@/hooks/CustomLink'
import { ChevronDown, LayoutDashboard, LogOut, SettingsIcon, User } from 'lucide-react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
  
const UserAvatar = () => {
  const {user, logout} = useContext(AuthContext)
  return (
    <DropdownMenu>
  <DropdownMenuTrigger><div className='flex items-center gap-2 justify-between'>
  <Avatar className="object-cover h-8 w-8">
  <AvatarImage src={user?.avatar} className="object-cover h-8 w-8"/>
  <AvatarFallback></AvatarFallback>
</Avatar>
  </div>
</DropdownMenuTrigger>
  <DropdownMenuContent className="lg:mr-0 mr-4">
    <DropdownMenuLabel className="flex items-center gap-1 capitalize">
   <Label>{user?.firstName}</Label>
  <Label>{user?.lastName}</Label>
  </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <a href="/settings">    <DropdownMenuItem className="flex items-center gap-1.5 text-sm mb-1"><SettingsIcon className='text-gray-500 h-4 w-4'/>Settings</DropdownMenuItem></a>
    {user.isAdmin && (
       <a href="/dashboard">    <DropdownMenuItem className="flex items-center gap-1.5 text-sm mb-1"><LayoutDashboard className='text-gray-500 h-4 w-4'/>Dashboard</DropdownMenuItem></a>
    )}
    <button className='w-full px-2.5 py-0.5' onClick={()=>logout()}>    <p className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-500"><LogOut className='text-red-500 h-4 w-4'/>Log Out</p></button>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserAvatar