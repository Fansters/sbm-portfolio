"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const menuVariants: Variants = {
		closed: {
			clipPath: "circle(0px at calc(100% - 40px) 40px)",
			transition: { type: "spring", stiffness: 400, damping: 40 },
		},
		open: {
			clipPath: "circle(200% at calc(100% - 40px) 40px)",
			transition: { type: "spring", stiffness: 40, restDelta: 2 },
		},
	};

	const linkContainerVariants = {
		closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
		open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
	};

	const linkVariants = {
		closed: { y: 20, opacity: 0 },
		open: { y: 0, opacity: 1 },
	};

	return (
		<>
			{/* Increased header z-index to z-50 to ensure it's above hero content */}
			<header className='fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-6 py-4 md:px-12 lg:px-24 flex items-center justify-between shadow-sm'>
				{/* Logo */}
				<Link href='#home' className='flex items-center gap-2 cursor-pointer z-[60] relative'>
					<div className='relative flex items-center justify-center'>
						<Image src='/sbmLogo.png' alt='SBM Logo' width={40} height={40} className='object-contain' priority />
					</div>
					<span className='text-brandMaroon font-semibold tracking-wide text-sm md:text-base uppercase ml-1'>
						Virtual Support
					</span>
				</Link>

				{/* Desktop Nav Links - Shifted from md: to lg: so iPad gets burger menu */}
				<nav className='hidden lg:flex items-center gap-8 text-sm font-medium text-gray-800'>
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

				{/* Get Started Button (Desktop) - Shifted from md: to lg: */}
				<div className='hidden lg:block'>
					<Link
						href='#contact'
						className='bg-brandMaroon hover:bg-[#600f1e] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md'
					>
						Get Started
					</Link>
				</div>

				{/* Mobile Menu Toggle Button - Shifted from md: to lg: */}
				{/* Increased to z-[60] so it sits ON TOP of the mobile menu overlay */}
				<button
					className='lg:hidden text-gray-800 p-2 z-[60] relative transition-transform'
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<AnimatePresence mode='wait'>
						{isMobileMenuOpen ? (
							<motion.div
								key='close'
								initial={{ opacity: 0, rotate: -90 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: 90 }}
							>
								<X size={26} className='text-white' />
							</motion.div>
						) : (
							<motion.div
								key='menu'
								initial={{ opacity: 0, rotate: 90 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: -90 }}
							>
								<Menu size={26} />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</header>

			{/* Full-Screen Animated Mobile Menu */}
			{/* Shifted from md: to lg: */}
			<motion.div
				initial='closed'
				animate={isMobileMenuOpen ? "open" : "closed"}
				variants={menuVariants}
				className='fixed inset-0 z-50 bg-brandMaroon lg:hidden flex flex-col items-center justify-center pointer-events-none'
				style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
			>
				<motion.div variants={linkContainerVariants} className='flex flex-col items-center gap-8'>
					{/* Updated menu items to match desktop */}
					{["Home", "Services", "About Me", "Portfolio", "Testimonials", "Contact"].map((item, i) => (
						<motion.div key={i} variants={linkVariants}>
							<Link
								href={`#${item.toLowerCase().replace(" ", "-")}`}
								onClick={() => setIsMobileMenuOpen(false)}
								className='text-white text-4xl font-bold tracking-wide hover:text-brandPink transition-colors'
							>
								{item}
							</Link>
						</motion.div>
					))}
					{/* Removed the Get Started button block from here */}
				</motion.div>
			</motion.div>
		</>
	);
}
