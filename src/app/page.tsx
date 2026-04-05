"use client";

import Navbar from "@/app/components/Navbar";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	// Mouse Parallax Setup
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springConfig = { damping: 25, stiffness: 150 };
	const smoothX = useSpring(mouseX, springConfig);
	const smoothY = useSpring(mouseY, springConfig);

	const tooltip1X = useTransform(smoothX, [-1, 1], [-20, 20]);
	const tooltip1Y = useTransform(smoothY, [-1, 1], [-20, 20]);
	const tooltip2X = useTransform(smoothX, [-1, 1], [32, -32]);
	const tooltip2Y = useTransform(smoothY, [-1, 1], [32, -32]);

	const handleMouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY } = e;
		const targetX = (clientX / window.innerWidth - 0.5) * 2;
		const targetY = (clientY / window.innerHeight - 0.5) * 2;
		mouseX.set(targetX);
		mouseY.set(targetY);
	};

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	// --- NEW SEQUENCED ANIMATION VARIANTS ---

	// 1. "Hello There" types in first
	const helloVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
	};

	// 2. Reduced Pause (-0.2s), then Main Title types in
	const titleVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 1.6 } },
	};

	// 3. Reduced Pause (-0.2s gap), then paragraph and button fade in together
	const fadeVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { delay: 3.6, duration: 0.8 } },
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

			<Navbar />

			{/* --- HERO SECTION --- */}
			<main
				id='home'
				onMouseMove={handleMouseMove}
				className='relative bg-gray-50 min-h-[100svh] pt-12 md:pt-24 lg:pt-32 flex items-center px-6 md:px-12 lg:px-24'
			>
				{/* Left Column: Text Content */}
				<div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 z-40 relative pb-[260px] lg:pb-0'>
					<div className='flex flex-col gap-4 md:gap-6 max-w-xl mt-2 md:mt-0'>
						{/* 1. Hello There Animation */}
						<motion.h2
							variants={helloVariants}
							initial='hidden'
							animate={!isLoading ? "visible" : "hidden"}
							className='text-lg md:text-xl lg:text-2xl text-gray-600 font-medium flex'
						>
							{"Hello There!".split("").map((char, i) => (
								<motion.span key={`hello-${i}`} variants={letterVariants}>
									{char === " " ? "\u00A0" : char}
								</motion.span>
							))}
						</motion.h2>

						{/* 2. Main Title Animation */}
						<motion.h1
							variants={titleVariants}
							initial='hidden'
							animate={!isLoading ? "visible" : "hidden"}
							className='text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight md:leading-tight'
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

						{/* 3. Fade In Details & Button */}
						<motion.div
							variants={fadeVariants}
							initial='hidden'
							animate={!isLoading ? "visible" : "hidden"}
							className='flex flex-col gap-4 md:gap-6'
						>
							<p className='text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-md'>
								I&apos;m Sheremie, I help you stay organized, manage your tasks, and keep your business running smoothly
								so you can focus on what matters most.
							</p>

							<p className='text-xs md:text-sm text-gray-500 italic'>Currently available for 2-3 new clients</p>

							<div className='pt-2'>
								<button className='bg-brandMaroon hover:bg-[#600f1e] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1'>
									Hire Me!
								</button>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Right Column: Absolutely Positioned Image container */}
				<div className='absolute bottom-0 right-0 lg:right-[5%] w-full lg:w-1/2 h-full pointer-events-none flex items-end justify-center z-20'>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={!isLoading ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='relative z-10 w-[75%] sm:w-[65%] max-w-[350px] lg:max-w-none lg:w-[85%] xl:w-[70%] 2xl:w-[65%]'
					>
						{/* Pink Background Blob */}
						<div className='absolute top-[10%] right-[5%] w-full aspect-square -z-10 text-brandPink pointer-events-none'>
							<svg
								className='w-full h-full transform translate-x-4'
								viewBox='0 0 200 200'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fill='currentColor'
									d='M51.9,-64.8C65.5,-51.9,73.5,-32.5,75.4,-13.2C77.3,6.2,73.1,25.5,61.9,39.6C50.7,53.7,32.5,62.6,12.7,67.6C-7.2,72.5,-28.6,73.5,-44.6,63.9C-60.6,54.3,-71.2,34.1,-74.6,12.8C-78,-8.5,-74.2,-30.9,-61.8,-45.3C-49.4,-59.6,-28.4,-65.9,-8.6,-68.2C11.3,-70.5,38.3,-77.8,51.9,-64.8Z'
									transform='translate(100 100) scale(1.1)'
								/>
							</svg>
						</div>

						{/* Profile Image */}
						<Image
							src='/sheremie.png'
							alt='Sheremie - Virtual Assistant'
							width={520}
							height={700}
							className='w-full h-auto object-contain object-bottom pointer-events-auto'
							priority
						/>

						{/* Top Right Tooltip - Pink */}
						<motion.div
							style={{ x: tooltip1X, y: tooltip1Y }}
							className='absolute right-[2%] md:right-0 lg:right-[-2%] bottom-[45%] md:bottom-[40%] z-30 pointer-events-auto'
						>
							<motion.div
								animate={{ y: [0, -8, 0] }}
								transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
								className='relative bg-brandPink text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium shadow-lg whitespace-nowrap'
							>
								The Support You Need
								<div className='absolute top-1/2 -translate-y-1/2 -left-1.5 md:-left-2 w-0 h-0 border-y-[4px] md:border-y-[6px] border-y-transparent border-r-[6px] md:border-r-[8px] border-r-brandPink'></div>
							</motion.div>
						</motion.div>

						{/* Bottom Left Tooltip - Maroon */}
						<motion.div
							style={{ x: tooltip2X, y: tooltip2Y }}
							className='absolute left-[2%] md:left-0 lg:left-[-4%] bottom-[15%] md:bottom-[20%] z-30 pointer-events-auto'
						>
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
								className='relative bg-brandMaroon text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium shadow-lg whitespace-nowrap'
							>
								Your Virtual Assistant
								<div className='absolute -top-1.5 md:-top-2 left-4 md:left-6 w-0 h-0 border-x-[4px] md:border-x-[6px] border-x-transparent border-b-[6px] md:border-b-[8px] border-b-brandMaroon'></div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				{/* --- CUSTOM STRAIGHT DIV BOTTOM --- */}
				<div className='absolute bottom-0 left-0 w-full h-8 z-30 pointer-events-none flex items-end justify-center'>
					{/* Maroon Div - Behind, slightly wider, rotated dynamically to peek out */}
					<div className='absolute w-[110%] h-8 bg-brandMaroon rotate-[-5deg] md:rotate-[-2deg] lg:rotate-[-1.5deg] origin-center'></div>

					{/* Pink Div - In front, completely straight */}
					<div className='absolute w-full h-8 bg-brandPink'></div>
				</div>
			</main>

			{/* Services Section */}
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
