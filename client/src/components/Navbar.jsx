import React from 'react';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Menu, MenuIcon, MenuSquare } from 'lucide-react';
import { Link } from 'react-router-dom'



const Navbar = () => {
    return (
        <nav className=" p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
            <div className="container mx-auto flex justify-between items-center ">
                <Link to="/"> <div className="text-lg font-bold">
                    ShubhBlog
                </div></Link>
                <div className={`md:flex space-x-4 hidden items-center`}>
                    <Link to="/" className="hover:text-blue-500 hover:shine hover:font-bold">
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-blue-500 hover:shine hover:font-bold">
                        About
                    </Link>
                    <Link to="/blogs" className="hover:text-blue-500 hover:shine hover:font-bold">
                        Blogs
                    </Link>
                    <Link to="/contact" className="hover:text-blue-500 hover:shine hover:font-bold">
                        Contact
                    </Link>
                    <div className='flex items-center'>
                        <button className="mx-1 cursor-pointer bg-black hover:bg-gray-900 text-white px-1.5 py-1 rounded-md " >Signup</button>
                        <button className="mx-1 cursor-pointer bg-black hover:bg-gray-900 text-white px-1.5 py-1 rounded-md " >Login</button>
                    </div>
                </div>
                <div className="md:hidden items-center " >
                    <Sheet>
                        <SheetTrigger>
                            <MenuIcon className='pt-1' />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="font-bold my-4">ShubhBlog</SheetTitle>
                                <SheetDescription>
                                    <div className="flex flex-col gap-6 text-center">
                                        <Link to="/">
                                            Home
                                        </Link>
                                        <Link to="/about">
                                            About
                                        </Link>
                                        <Link to="/blog">
                                            Blog
                                        </Link>
                                        <Link to="/contact">
                                            Contact
                                        </Link>
                                        <div>
                                            <button className="mx-1 text-xs cursor-pointer bg-black text-white" >Signup</button>
                                            <button className="mx-1 text-xs cursor-pointer bg-black text-white" >Login</button>
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>

        </nav >
    );
};

export default Navbar;