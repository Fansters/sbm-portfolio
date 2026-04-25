"use client";

import Navbar from "@/app/components/Navbar";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

// --- DATA FOR SERVICES SECTION ---
const servicesData = [
	{
		number: "01",
		title: "BASIC",
		desc: "Best for light tasks and day-to-day assistance",
		glassClass:
			"bg-[length:300%_300%] bg-gradient-to-br from-brandPink/40 via-white/30 to-brandPink/30 backdrop-blur-sm md:backdrop-blur-3xl border-[1.5px] border-white/60 shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(255,255,255,0.3)]",
		titleClass: "text-gray-900",
		descClass: "text-gray-700",
		bulletTextClass: "text-gray-800",
		bulletIconClass: "bg-brandMaroon",
		btnClass: "bg-brandMaroon hover:bg-[#600f1e] text-white",
		numberClass: "from-black/10 to-transparent",
		items: ["Calendar management", "Email organization", "Task tracking", "Basic admin support"],
	},
	{
		number: "02",
		title: "PRO",
		desc: "For individuals who need consistent, reliable support",
		glassClass:
			"bg-[length:300%_300%] bg-gradient-to-br from-brandMaroon/99 via-brandMaroon/80 to-brandMaroon/90 backdrop-blur-sm md:backdrop-blur-3xl border-[1.5px] border-white/30 shadow-lg md:shadow-[0_15px_40px_rgba(122,19,39,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3)]",
		titleClass: "text-white",
		descClass: "text-brandPink",
		bulletTextClass: "text-gray-100",
		bulletIconClass: "bg-brandPink",
		btnClass: "bg-white hover:bg-gray-100 text-brandMaroon",
		numberClass: "from-white/15 to-transparent",
		items: ["All Essential", "Inbox & communication", "Social media support", "Content posting"],
	},
	{
		number: "03",
		title: "CUSTOM",
		desc: "Flexible support for your workflow and needs",
		glassClass:
			"bg-[length:300%_300%] bg-gradient-to-br from-brandPink/20 via-white/60 to-brandPink/30 backdrop-blur-sm md:backdrop-blur-3xl border-[1.5px] border-white/60 shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(255,255,255,0.3)]",
		titleClass: "text-gray-900",
		descClass: "text-gray-700",
		bulletTextClass: "text-gray-800",
		bulletIconClass: "bg-brandMaroon",
		btnClass: "bg-brandMaroon hover:bg-[#600f1e] text-white",
		numberClass: "from-black/10 to-transparent",
		items: ["Customized tasks", "Ongoing admin support", "Priority assistance", "Scalable support"],
	},
];

// --- DATA FOR TOOLS SECTION ---
const toolsData = [
	{ name: "Instagram", icon: "/tools/instagram.svg" },
	{ name: "TikTok", icon: "/tools/tiktok.svg" },
	{ name: "Meta Suite", icon: "/tools/meta.svg" },
	{ name: "WhatsApp", icon: "/tools/whatsapp.svg" },
	{ name: "Canva", icon: "/tools/canva.svg" },
	{ name: "CapCut", icon: "/tools/capcut.svg" },
	{ name: "Slack", icon: "/tools/slack.svg" },
	{ name: "Drive", icon: "/tools/drive.svg" },
	{ name: "Gmail", icon: "/tools/gmail.svg" },
	{ name: "Docs", icon: "/tools/docs.svg" },
	{ name: "Sheets", icon: "/tools/sheets.svg" },
	{ name: "Excel", icon: "/tools/excel.svg" },
	{ name: "Calendar", icon: "/tools/calendar.svg" },
	{ name: "Pinterest", icon: "/tools/pinterest.svg" },
	{ name: "Airtable", icon: "/tools/airtable.svg" },
	{ name: "Notion", icon: "/tools/notion.svg" },
	{ name: "Trello", icon: "/tools/trello.svg" },
	{ name: "Asana", icon: "/tools/asana.svg" },
	{ name: "Zoom", icon: "/tools/zoom.svg" },
	{ name: "Teams", icon: "/tools/teams.svg" },
	{ name: "Meet", icon: "/tools/meet.svg" },
	{ name: "Gemini", icon: "/tools/gemini.svg" },
	{ name: "ChatGPT", icon: "/tools/chatgpt.svg" },
	{ name: "Zapier", icon: "/tools/zapier.svg" },
];

// --- DATA FOR EDUCATION & WORK SECTION ---
const educationData = [
	{
		date: "2022-2026",
		title: "Bulacan State University",
		desc: "BS in Business Administration\nMajor in Marketing Management",
	},
	{
		date: "2020-2022",
		title: "Mary and Jesus School Inc.",
		desc: "Accountancy, Business, and\nManagement (ABM) Senior High School",
	},
	{ date: "2016-2020", title: "Mary and Jesus School Inc.", desc: "Junior High School" },
];

const workData = [
	{ date: "Jun 2025 - Mar 2026", title: "Virtual Assistant", desc: "Win with Barlow | EZMobileDNA" },
	{ date: "Feb 2025 - Mar 2026", title: "Content Manager", desc: "Mascon Tech | Seartify" },
	{ date: "Oct 2024 - Jan 2025", title: "Social Media Manager", desc: "LW Business Innovations" },
];

// --- DATA FOR PORTFOLIO SECTION ---
const portfolioData = [
	{
		client: "Win with Barlow",
		projects: [
			{
				image: "/portfolio/spreadsheet.png", // Replace with your actual image path
				overlay: "Client details hidden for confidentiality",
				desc: "Organized client concerns into a structured sheet to help streamline responses and ensure no inquiries were missed. This system made it easier to track, prioritize, and respond efficiently.",
			},
			{
				image: "/portfolio/inbox.png", // Replace with your actual image path
				overlay: "Client details hidden for confidentiality",
				desc: "Managed and organized client emails by categorizing messages and maintaining a clear workflow for timely and accurate responses.",
			},
		],
	},
];

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const [isPhone, setIsPhone] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
			setIsPhone(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

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

	const servicesRef = useRef<HTMLElement>(null);

	const { scrollYProgress: servicesScroll } = useScroll({
		target: servicesRef,
		offset: ["start end", "end start"],
	});

	const r1 = isMobile ? [0.02, 0.2, 0.6, 0.99] : [0.0, 0.3, 0.7, 0.96];
	const r2 = isMobile ? [0.04, 0.3, 0.7, 0.99] : [0.0, 0.35, 0.72, 0.98];
	const r3 = isMobile ? [0.07, 0.4, 0.88, 1.0] : [0.0, 0.38, 0.75, 1.0];

	const card1Y = useTransform(servicesScroll, r1, [400, 0, 0, -400]);
	const card2Y = useTransform(servicesScroll, r2, [400, 0, 0, -500]);
	const card3Y = useTransform(servicesScroll, r3, [400, 0, 0, -400]);

	const card1Scale = useTransform(servicesScroll, r1, [0.8, 1, 1, 0.8]);
	const card2Scale = useTransform(servicesScroll, r2, [0.8, 1, 1, 0.8]);
	const card3Scale = useTransform(servicesScroll, r3, [0.8, 1, 1, 0.8]);

	const op1 = isMobile ? [0.1, 0.4, 0.9, 0.95] : [0.1, 0.3, 0.75, 0.85];
	const op2 = isMobile ? [0.15, 0.45, 0.92, 0.98] : [0.15, 0.4, 0.8, 0.9];
	const op3 = isMobile ? [0.2, 0.5, 0.95, 1.0] : [0.2, 0.5, 0.55, 0.95];

	const card1Opacity = useTransform(servicesScroll, op1, [0, 1, 1, 0]);
	const card2Opacity = useTransform(servicesScroll, op2, [0, 1, 1, 0]);
	const card3Opacity = useTransform(servicesScroll, op3, [0, 1, 1, 0]);

	const cardYTransforms = [card1Y, card2Y, card3Y];
	const cardScales = [card1Scale, card2Scale, card3Scale];
	const cardOpacities = [card1Opacity, card2Opacity, card3Opacity];

	// --- SCROLL ANIMATION SETUP (Experience) ---
	const experienceRef = useRef<HTMLElement>(null);

	const { scrollYProgress: expScroll } = useScroll({
		target: experienceRef,
		offset: ["start end", "end start"],
	});

	const expCard1X = useTransform(expScroll, [0.1, 0.45, 0.55, 0.9], [-400, 0, 0, -400]);
	const expCard2X = useTransform(expScroll, [0.1, 0.45, 0.55, 0.9], [400, 0, 0, 400]);
	const expScale = useTransform(expScroll, [0.1, 0.45, 0.55, 0.9], [0.8, 1, 1, 0.8]);
	const expOpacity = useTransform(expScroll, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

	const helloVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
	};

	const titleVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 1.6 } },
	};

	const fadeVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { delay: 3.6, duration: 0.8 } },
	};

	const letterVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div
			className='min-h-screen flex flex-col overflow-x-hidden'
			style={{ backgroundImage: 'url("/prism.svg")', backgroundRepeat: "repeat" }}
		>
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
				// Removed min-h-[100dvh] & flex-items-center! Added static generous padding.
				// This solves both the mobile URL bar lag AND the desktop 150% zoom overlap bug!
				className='relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 px-6 md:px-12 lg:px-24'
			>
				{/* Adjusted bottom padding to perfectly seat the text away from the absolute image */}
				<div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 z-40 relative pb-[280px] md:pb-[340px] lg:pb-[140px]'>
					<div className='flex flex-col gap-4 md:gap-6 max-w-xl mt-2 md:mt-0'>
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

						<motion.h1
							variants={titleVariants}
							initial='hidden'
							animate={!isLoading ? "visible" : "hidden"}
							className='text-[32px] leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 md:leading-tight'
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

							<p className='hidden md:block text-xs md:text-sm text-gray-500 italic'>
								Currently available for 2-3 new clients
							</p>

							<div className='pt-2'>
								<button className='bg-brandMaroon hover:bg-[#600f1e] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1'>
									Hire Me!
								</button>
							</div>
						</motion.div>
					</div>
				</div>

				<div className='absolute bottom-0 right-0 lg:right-[5%] w-full lg:w-1/2 h-full pointer-events-none flex items-end justify-center z-20'>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={!isLoading ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='relative z-10 w-[75%] sm:w-[65%] max-w-[350px] lg:max-w-none lg:w-[85%] xl:w-[70%] 2xl:w-[65%]'
					>
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

						<Image
							src='/sheremie.png'
							alt='Sheremie - Virtual Assistant'
							width={520}
							height={700}
							className='w-full h-auto object-contain object-bottom pointer-events-auto'
							priority
						/>

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

				<div className='absolute bottom-0 left-0 w-full h-8 z-30 pointer-events-none flex items-end justify-center'>
					<div className='absolute w-[110%] h-8 bg-brandMaroon rotate-[-5deg] md:rotate-[-2deg] lg:rotate-[-1.5deg] origin-center'></div>
					<div className='absolute w-full h-8 bg-brandPink'></div>
				</div>
			</main>

			{/* --- SERVICES SECTION --- */}
			<section
				ref={servicesRef}
				id='services'
				className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 z-40'
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className='mb-16'
				>
					<div className='flex items-center gap-3 mb-4'>
						<div className='w-6 h-[2px] bg-brandMaroon'></div>
						<span className='text-gray-800 text-sm font-medium tracking-wide uppercase'>Services</span>
					</div>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
						<span className='text-brandMaroon italic'>Services</span> I Provide
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 min-[651px]:grid-cols-2 min-[1001px]:grid-cols-3 gap-6 md:gap-8'>
					{servicesData.map((service, index) => (
						<motion.div
							key={index}
							animate={
								isPhone
									? {}
									: {
											backgroundPosition:
												index % 2 === 0
													? ["0% 50%", "100% 100%", "50% 0%", "0% 100%", "100% 0%", "0% 50%"]
													: ["100% 50%", "0% 0%", "100% 100%", "50% 0%", "0% 100%", "100% 50%"],
										}
							}
							transition={{
								duration: [13.84, 15.48, 18.99][index],
								ease: "easeInOut",
								repeat: Infinity,
							}}
							style={{
								y: isMobile ? 0 : cardYTransforms[index],
								scale: isMobile ? 1 : cardScales[index],
								opacity: isMobile ? 1 : cardOpacities[index],
							}}
							className={`relative overflow-hidden flex flex-col justify-between rounded-[2rem] p-8 pb-10 md:p-10 md:pb-12 transition-shadow 
                ${service.glassClass} 
                ${index === 2 ? "min-[651px]:col-span-2 min-[1001px]:col-span-1" : ""}
              `}
						>
							<div className='absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0'>
								<span
									className={`text-[175px] md:text-[200px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-b ${service.numberClass}`}
								>
									{service.number}
								</span>
							</div>

							<div className='relative z-10'>
								<h3 className={`text-3xl md:text-4xl font-bold mb-2 ${service.titleClass}`}>{service.title}</h3>
								<p className={`text-sm md:text-base font-medium mb-8 leading-snug ${service.descClass}`}>
									{service.desc}
								</p>

								<ul className={`space-y-4 md:space-y-5 mb-16 ${service.bulletTextClass}`}>
									{service.items.map((item, i) => (
										<li key={i} className='flex items-start gap-3 font-semibold text-sm md:text-base leading-snug'>
											<div className={`w-1.5 h-1.5 mt-2 rounded-full shrink-0 ${service.bulletIconClass}`}></div>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							<button
								className={`w-full relative z-20 py-3.5 rounded-full font-bold tracking-wider text-sm transition-transform hover:-translate-y-1 shadow-lg ${service.btnClass}`}
							>
								GET STARTED
							</button>
						</motion.div>
					))}
				</div>
			</section>

			{/* --- TOOLS SECTION --- */}
			<section
				id='tools'
				className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-32 md:pt-24 md:pb-48 z-40'
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.6 }}
					className='mb-16'
				>
					<div className='flex items-center gap-3 mb-4'>
						<div className='w-6 h-[2px] bg-brandMaroon'></div>
						<span className='text-gray-800 text-sm font-medium tracking-wide uppercase'>My Favorite Tools</span>
					</div>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
						<span className='text-brandMaroon italic'>Tools</span> I Use
					</h2>
				</motion.div>

				<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-10 gap-x-4 md:gap-x-6 justify-items-center'>
					{toolsData.map((tool, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
							className='flex flex-col items-center gap-4 group'
						>
							<div className='w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.1)] flex items-center justify-center p-4 transition-transform duration-300 group-hover:-translate-y-2'>
								<div className='w-full h-full bg-white rounded-full flex items-center justify-center text-gray-300 text-xs text-center leading-none'>
									<Image src={tool.icon} alt={tool.name} width={60} height={60} className='object-contain' />
								</div>
							</div>
							<span className='text-xs md:text-sm font-bold text-gray-800 text-center'>{tool.name}</span>
						</motion.div>
					))}
				</div>
			</section>

			{/* --- WRAPPER FOR MAROON BACKGROUND --- */}
			<div
				className='relative w-full bg-[#6b1626] overflow-hidden z-40'
				style={{ backgroundImage: 'url("/prismMaroon.svg")', backgroundRepeat: "repeat" }}
			>
				{/* --- ABOUT ME SECTION --- */}
				<section id='about' className='py-24 md:py-32'>
					<div className='flex justify-center mb-16 md:mb-24'>
						<div className='flex items-center gap-3'>
							<div className='w-6 h-[1px] bg-white/60'></div>
							<span className='text-white/80 text-sm font-medium tracking-wide uppercase'>About Me</span>
						</div>
					</div>

					<div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
						{/* LEFT: Image Container without pink circle */}
						<div className='relative w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto flex items-end justify-center mt-8 lg:mt-0'>
							<Image
								src='/sherAboutMe.png'
								alt='Sheremie'
								width={500}
								height={600}
								className='relative z-10 w-[90%] h-auto object-contain object-bottom drop-shadow-xl'
							/>
						</div>

						{/* RIGHT: Text Content */}
						<div className='flex flex-col gap-6 text-white text-center lg:text-left'>
							<h2 className='text-4xl md:text-5xl font-bold leading-tight'>
								Who is <span className='text-brandPink italic'>Sheremie?</span>
							</h2>

							<p className='text-white/80 text-sm md:text-base leading-relaxed'>
								I&apos;m Sheremie, a Virtual Assistant and Marketing Management student who helps business owners stay
								organized and on track. With experience in admin support, content management, and client coordination, I
								focus on making day-to-day tasks easier and more manageable. I&apos;m detail-oriented, reliable, and
								committed to delivering support that actually makes a difference.
							</p>

							<p className='text-white/80 text-sm md:text-base leading-relaxed'>
								I&apos;m always improving my skills and learning better systems to provide efficient and consistent
								support for every client I work with. Let&apos;s work together and make your workload lighter.
							</p>

							{/* Quick Stats Row */}
							<div className='grid grid-cols-3 gap-4 my-4'>
								<div>
									<h4 className='text-3xl md:text-4xl font-bold mb-1'>400+</h4>
									<p className='text-white/70 text-xs md:text-sm'>Projects Completed</p>
								</div>
								<div>
									<h4 className='text-3xl md:text-4xl font-bold mb-1'>10+</h4>
									<p className='text-white/70 text-xs md:text-sm'>Industry Serves</p>
								</div>
								<div>
									<h4 className='text-3xl md:text-4xl font-bold mb-1'>2+</h4>
									<p className='text-white/70 text-xs md:text-sm'>Years of Experience</p>
								</div>
							</div>

							{/* Centered button on mobile, left-aligned on desktop */}
							<div className='pt-4 flex justify-center lg:justify-start'>
								<button className='bg-white hover:bg-gray-100 text-brandMaroon px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-lg hover:-translate-y-1'>
									Work With Me
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* --- EDUCATION & WORK EXPERIENCE SECTION --- */}
				<section ref={experienceRef} id='experience' className='pt-24 md:pt-32 pb-24 md:pb-32'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.6 }}
						className='flex flex-col items-center mb-16 md:mb-20'
					>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-6 h-[1px] bg-white/60'></div>
							<span className='text-white/80 text-sm font-medium tracking-wide uppercase'>Education & Work</span>
							<div className='w-6 h-[1px] bg-white/60'></div>
						</div>
						<h2 className='text-3xl md:text-5xl font-bold text-white text-center leading-tight'>
							My <span className='italic text-brandPink'>Academic and</span>
							<br /> <span className='italic text-brandPink'>Professional</span> Journey
						</h2>
					</motion.div>

					<div className='max-w-5xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[73px] lg:gap-20 overflow-hidden md:overflow-visible'>
						{/* Education Card */}
						<motion.div
							style={{
								x: isPhone ? 0 : expCard1X,
								scale: isPhone ? 1 : expScale,
								opacity: isPhone ? 1 : expOpacity,
							}}
							className='relative overflow-hidden rounded-[2rem] p-8 md:p-10 bg-gradient-to-br from-white/95 via-white/80 to-white/90 backdrop-blur-xl border-[3px] border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
						>
							<div className='flex items-center gap-4 mb-6'>
								<div className='w-12 h-12 rounded-full bg-brandMaroon/10 flex items-center justify-center text-brandMaroon'>
									<GraduationCap size={28} />
								</div>
								<h3 className='text-2xl font-bold text-gray-900'>Education</h3>
							</div>

							<div className='w-full h-[1.5px] bg-brandMaroon/20 mb-8'></div>

							<div className='border-l-[1.5px] border-brandMaroon/20 ml-2 space-y-8 py-2'>
								{educationData.map((item, i) => (
									<div key={i} className='relative pl-6'>
										<div className='absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brandMaroon ring-4 ring-white/50'></div>
										<p className='text-xs text-gray-500 font-semibold tracking-wide mb-1'>{item.date}</p>
										<h4 className='text-base md:text-lg font-bold text-gray-900 leading-tight'>{item.title}</h4>
										<p className='text-sm text-gray-700 leading-snug whitespace-pre-line mt-1'>{item.desc}</p>
									</div>
								))}
							</div>
						</motion.div>

						{/* Work Experience Card - Updated styling to perfectly match Education */}
						<motion.div
							style={{
								x: isPhone ? 0 : expCard2X,
								scale: isPhone ? 1 : expScale,
								opacity: isPhone ? 1 : expOpacity,
							}}
							className='relative overflow-hidden rounded-[2rem] p-8 md:p-10 bg-gradient-to-br from-white/95 via-white/80 to-white/90 backdrop-blur-xl border-[3px] border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
						>
							<div className='flex items-center gap-4 mb-6'>
								<div className='w-12 h-12 rounded-full bg-brandMaroon/10 flex items-center justify-center text-brandMaroon'>
									<Briefcase size={28} />
								</div>
								<h3 className='text-2xl font-bold text-gray-900'>Work Experience</h3>
							</div>

							<div className='w-full h-[1.5px] bg-brandMaroon/20 mb-8'></div>

							<div className='border-l-[1.5px] border-brandMaroon/20 ml-2 space-y-8 py-2'>
								{workData.map((item, i) => (
									<div key={i} className='relative pl-6'>
										<div className='absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brandMaroon ring-4 ring-white/50'></div>
										<p className='text-xs text-gray-500 font-semibold tracking-wide mb-1'>{item.date}</p>
										<h4 className='text-base md:text-lg font-bold text-gray-900 leading-tight'>{item.title}</h4>
										<p className='text-sm text-gray-700 leading-snug whitespace-pre-line mt-1'>{item.desc}</p>
									</div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			</div>

			{/* --- NEW: PORTFOLIO SECTION --- */}
			<section id='portfolio' className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 z-40'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.6 }}
					className='mb-16 md:mb-20'
				>
					<div className='flex items-center gap-3 mb-4'>
						<div className='w-6 h-[2px] bg-brandMaroon'></div>
						<span className='text-gray-800 text-sm font-medium tracking-wide uppercase'>Portfolio</span>
					</div>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
						My Latest <span className='text-brandMaroon italic'>Tasks/Projects</span>
					</h2>
				</motion.div>

				{/* Portfolio Content */}
				{portfolioData.map((clientData, idx) => (
					<div key={idx} className='mb-24 last:mb-0'>
						{/* Client Sub-Header */}
						<motion.h3
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className='text-2xl md:text-3xl font-bold italic text-center text-gray-900 mb-12'
						>
							{clientData.client}
						</motion.h3>

						{/* Projects Grid (1 col on phone/iPad, 2 cols on Desktop) */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
							{clientData.projects.map((project, pIdx) => (
								<motion.div
									key={pIdx}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-50px" }}
									transition={{ duration: 0.5, delay: pIdx * 0.2 }}
									className='flex flex-col items-center gap-6'
								>
									{/* Image Container with Overlay */}
									<div className='relative w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden shadow-md group'>
										{/* Fallback Placeholder (Shows until you add real images) */}
										<div className='absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100'>
											<span className='text-sm font-medium tracking-widest uppercase'>Image: {project.image}</span>
										</div>

										{/* Uncomment this once you add your images to the public/portfolio folder!
                    <Image 
                      src={project.image}
                      alt="Portfolio Project"
                      fill
                      className="object-cover"
                    />
                    */}

										{/* Maroon Overlay Pill */}
										<div className='absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none'>
											<div className='bg-brandMaroon text-white italic font-medium px-4 py-1.5 rounded shadow-lg text-sm md:text-base text-center'>
												{project.overlay}
											</div>
										</div>
									</div>

									{/* Description underneath */}
									<p className='text-gray-900 text-sm md:text-base leading-relaxed text-center max-w-lg font-medium'>
										{project.desc}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
