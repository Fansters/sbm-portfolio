"use client";

import Navbar from "@/app/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading to show the pulsating logo before revealing the site
		const timer = setTimeout(() => setIsLoading(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	// Framer Motion Variants for the new Character Typing Effect
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.05, delayChildren: 0.2 },
		},
	};

	const letterVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className='min-h-screen bg-white flex flex-col overflow-x-hidden'>
			{/* LOADING SCREEN */}
			<AnimatePresence>
				{isLoading && (
					<motion.div
						initial={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.8 } }}
						className='fixed inset-0 z-[100] flex items-center justify-center bg-white'
					>
						<motion.div
							animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
							transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
						>
							<Image src='/sbmLogo.png' alt='Loading SBM Logo' width={80} height={80} priority />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Import the Navbar */}
			<Navbar />

			{/* --- HERO SECTION --- */}
			<main id='home' className='relative bg-gray-50 min-h-[100svh] pt-24 flex items-center px-6 md:px-12 lg:px-24'>
				{/* Left Column: Text Content */}
				{/* Increased z-index to 40 so text is above everything */}
				<div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 z-40 relative pb-32 lg:pb-0'>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={!isLoading ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.5 }}
						className='flex flex-col gap-6 max-w-xl mt-12 md:mt-0'
					>
						<h2 className='text-xl md:text-2xl text-gray-600 font-medium'>Hello There!</h2>

						{/* TYPING ANIMATION TITLE */}
						<motion.h1
							variants={containerVariants}
							initial='hidden'
							animate={!isLoading ? "visible" : "hidden"}
							className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight'
						>
							{"I'm ".split("").map((char, i) => (
								<motion.span key={`im-${i}`} variants={letterVariants}>
									{char}
								</motion.span>
							))}
							<span className='text-brandMaroon italic'>
								{"Sheremie,".split("").map((char, i) => (
									<motion.span key={`sh-${i}`} variants={letterVariants}>
										{char}
									</motion.span>
								))}
							</span>
							<br />
							{"Your Go-To".split("").map((char, i) => (
								<motion.span key={`gt-${i}`} variants={letterVariants}>
									{char === " " ? "\u00A0" : char}
								</motion.span>
							))}
							<br />
							{"Virtual Assistant".split("").map((char, i) => (
								<motion.span key={`va-${i}`} variants={letterVariants}>
									{char === " " ? "\u00A0" : char}
								</motion.span>
							))}
						</motion.h1>

						<p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-md'>
							I&apos;m Sheremie, I help you stay organized, manage your tasks, and keep your business running smoothly
							so you can focus on what matters most.
						</p>

						<p className='text-sm text-gray-500 italic'>Currently available for 2-3 new clients</p>

						<div className='pt-2'>
							<button className='bg-brandMaroon hover:bg-[#600f1e] text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1'>
								Hire Me!
							</button>
						</div>
					</motion.div>
				</div>

				{/* Right Column: Absolutely Positioned Image container */}
				{/* z-20 means it sits BEHIND the swoosh (which is z-30) */}
				<div className='absolute bottom-0 right-0 lg:right-[5%] w-full lg:w-1/2 h-full pointer-events-none flex items-end justify-center z-20'>
					{/* Pink Background Blob - Reduced size */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 1 }}
						className='absolute top-[15%] lg:top-[20%] right-[0%] lg:right-[-5%] w-[80%] md:w-[65%] lg:w-[55%] aspect-square -z-10'
					>
						<svg
							className='w-full h-full text-brandPink transform translate-x-4'
							viewBox='0 0 200 200'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill='currentColor'
								d='M51.9,-64.8C65.5,-51.9,73.5,-32.5,75.4,-13.2C77.3,6.2,73.1,25.5,61.9,39.6C50.7,53.7,32.5,62.6,12.7,67.6C-7.2,72.5,-28.6,73.5,-44.6,63.9C-60.6,54.3,-71.2,34.1,-74.6,12.8C-78,-8.5,-74.2,-30.9,-61.8,-45.3C-49.4,-59.6,-28.4,-65.9,-8.6,-68.2C11.3,-70.5,38.3,-77.8,51.9,-64.8Z'
								transform='translate(100 100) scale(1.1)'
							/>
						</svg>
					</motion.div>

					{/* Profile Image - Adjusted sizes for mobile and desktop */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={!isLoading ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='relative z-10 w-[230px] md:w-[380px] lg:w-[520px]'
					>
						<Image
							src='/sheremie.png'
							alt='Sheremie - Virtual Assistant'
							width={520}
							height={700}
							className='w-full h-auto object-contain object-bottom pointer-events-auto'
							priority
						/>

						{/* Top Right Tooltip - Pink (with CSS Triangle) */}
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
							className='absolute right-[-10%] md:-right-8 bottom-[45%] md:bottom-[40%] z-30 pointer-events-auto'
						>
							<div className='relative bg-brandPink text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-medium shadow-lg whitespace-nowrap'>
								The Support You Need
								{/* CSS Triangle pointing left */}
								<div className='absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-brandPink'></div>
							</div>
						</motion.div>

						{/* Bottom Left Tooltip - Maroon (with CSS Triangle) */}
						<motion.div
							animate={{ y: [0, 10, 0] }}
							transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
							className='absolute left-[-10%] md:-left-12 bottom-[15%] md:bottom-[20%] z-30 pointer-events-auto'
						>
							<div className='relative bg-brandMaroon text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-medium shadow-lg whitespace-nowrap'>
								Your Virtual Assistant
								{/* CSS Triangle pointing up on the left side */}
								<div className='absolute -top-2 left-6 w-0 h-0 border-x-[6px] border-x-transparent border-b-[8px] border-b-brandMaroon'></div>
							</div>
						</motion.div>
					</motion.div>
				</div>

				{/* --- CUSTOM CANVA SWOOSH --- */}
				{/* Set to z-30 so it sits ON TOP of the image (which is z-20) */}
				<div className='absolute bottom-0 left-0 w-full z-30 pointer-events-none drop-shadow-sm'>
					<svg viewBox='0 0 1440 120' className='w-full block h-16 md:h-24 lg:h-32' preserveAspectRatio='none'>
						{/* Lighter Pink Layer */}
						<path d='M0,50 C400,100 1000,0 1440,70 L1440,120 L0,120 Z' fill='var(--color-brandPink)' opacity='0.9' />
						{/* Darker Maroon Layer */}
						<path d='M0,80 C400,120 1000,40 1440,90 L1440,120 L0,120 Z' fill='var(--color-brandMaroon)' />
					</svg>
				</div>
			</main>

			{/* Services Section starts here */}
			<section
				id='services'
				className='min-h-screen bg-white flex flex-col items-center justify-center relative z-40 pt-20'
			>
				<h2 className='text-4xl text-brandMaroon font-bold mb-4'>My Services</h2>
				<p className='text-gray-500 max-w-2xl text-center px-6'>
					This section now seamlessly flows from the landing page. We will build out your grid of services right here!
				</p>
			</section>
		</div>
	);
}
