import React, { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import UserAvatar from '../avatar/UserAvatar';
import { LoadingSpinner } from '@/lib/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import WebLogo from '@/imgs/jsx/WebLogo';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { IconShoppingCart } from '@tabler/icons-react';
import ShoppingCart from '@/functions/ShoppingCart';
const NavigationBar = () => {
    const { user, loading } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-14 items-center">
                    <Link to="/" className="flex items-center">
                    <WebLogo />
                    </Link>
                    <div className="hidden md:flex gap-4">
                        <Link
                            to="/"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                        >
                            Home
                        </Link>
                        <Link
                            to="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                        >
                            About
                        </Link>
                        <Link
                            to="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                        >
                            Services
                        </Link>
                        <Link
                            to="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {loading ? (
                            <LoadingSpinner className="h-3 w-3 animate-spin" />
                        ) : user ? (
                            <>
                            <UserAvatar />
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="" size="sm">
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )}
                        <button className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-transparent bg-opacity-50"
                        onClick={toggleMenu}
                    />
                )}
                {isMenuOpen && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 bottom-0 z-50 w-full bg-white shadow-lg dark:bg-gray-950"
                    >
                        <div className="flex flex-col p-4">
                           <div className='flex items-center justify-between'>
                            <div className='text-2xl font-semibold'>MENU</div>
                           <button className="self-end" onClick={toggleMenu}>
                                <X className="w-8 h-10" />
                            </button>
                           </div>
                            <Link
                                to="/"
                                className="mt-4 font-medium text-sm transition-colors hover:underline"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                to="#"
                                className="mt-4 font-medium text-sm transition-colors hover:underline"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                            <Link
                                to="#"
                                className="mt-4 font-medium text-sm transition-colors hover:underline"
                                onClick={toggleMenu}
                            >
                                Services
                            </Link>
                            <Link
                                to="#"
                                className="mt-4 font-medium text-sm transition-colors hover:underline"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                            {loading ? (
                                <LoadingSpinner className="h-3 w-3 animate-spin mt-4" />
                            ) : user ? (
                                <UserAvatar className="mt-4" />
                            ) : (
                                <Link to="/login" onClick={toggleMenu}>
                                    <Button variant="" size="sm" className="mt-4">
                                        Sign In
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default NavigationBar;
