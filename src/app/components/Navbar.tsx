"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className='fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-6 py-4 md:px-12 lg:px-24 flex items-center justify-between shadow-sm'>
			{/* Logo */}
			<Link href='#home' className='flex items-center gap-2 cursor-pointer'>
				<div className='relative flex items-center justify-center'>
					<Image src='/sbmLogo.png' alt='SBM Logo' width={40} height={40} className='object-contain' priority />
				</div>
				<span className='text-brandMaroon font-semibold tracking-wide text-sm md:text-base uppercase ml-1'>
					Virtual Support
				</span>
			</Link>

			{/* Desktop Nav Links */}
			<nav className='hidden md:flex items-center gap-8 text-sm font-medium text-gray-800'>
				<Link href='#home' className='hover:text-brandMaroon transition-colors'>
					Home
				</Link>
				<Link href='#services' className='hover:text-brandMaroon transition-colors'>
					Services
				</Link>
				<Link href='#about' className='hover:text-brandMaroon transition-colors'>
					About Me
				</Link>
				<Link href='#portfolio' className='hover:text-brandMaroon transition-colors'>
					Portfolio
				</Link>
				<Link href='#testimonials' className='hover:text-brandMaroon transition-colors'>
					Testimonials
				</Link>
				<Link href='#contact' className='hover:text-brandMaroon transition-colors'>
					Contact
				</Link>
			</nav>

			{/* Get Started Button (Desktop) */}
			<div className='hidden md:block'>
				<Link
					href='#contact'
					className='bg-brandMaroon hover:bg-[#600f1e] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md'
				>
					Get Started
				</Link>
			</div>

			{/* Mobile Menu Toggle */}
			<button className='md:hidden text-gray-800 p-2' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
				{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Mobile Menu Dropdown */}
			{isMobileMenuOpen && (
				<div className='absolute top-[72px] left-0 w-full bg-white shadow-xl z-50 flex flex-col p-6 gap-4 border-t border-gray-100 md:hidden'>
					<Link href='#home' onClick={() => setIsMobileMenuOpen(false)}>
						Home
					</Link>
					<Link href='#services' onClick={() => setIsMobileMenuOpen(false)}>
						Services
					</Link>
					<Link href='#about' onClick={() => setIsMobileMenuOpen(false)}>
						About Me
					</Link>
					<Link href='#portfolio' onClick={() => setIsMobileMenuOpen(false)}>
						Portfolio
					</Link>
					<Link href='#testimonials' onClick={() => setIsMobileMenuOpen(false)}>
						Testimonials
					</Link>
					<Link href='#contact' onClick={() => setIsMobileMenuOpen(false)}>
						Contact
					</Link>
				</div>
			)}
		</header>
	);
}
