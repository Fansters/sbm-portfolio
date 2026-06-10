"use client";

import AnimatedButton from "@/app/components/AnimatedButton";
import Navbar from "@/app/components/Navbar";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { GraduationCap, Briefcase, Star } from "lucide-react";

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================
export type TaskProjectData = {
	type: "tasks";
	client: string;
	projects: { image: string; overlay?: string; desc: string }[];
};

export type GraphicDesignProject = {
	type: "gallery";
	client: string;
	images: string[];
	subtitle?: string;
	desc?: string;
	aspectClass?: string;
};

export type ProjectData = TaskProjectData | GraphicDesignProject;

// ==========================================
// 2. DATA ARRAYS
// ==========================================
const servicesData = [
	{
		number: "01",
		title: "ADMIN",
		desc: "For daily organization and task management",
		glassClass:
			"bg-[length:300%_300%] bg-gradient-to-br from-brandPink/40 via-white/30 to-brandPink/30 backdrop-blur-sm md:backdrop-blur-3xl border-[1.5px] border-white/60 shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(255,255,255,0.3)]",
		titleClass: "text-gray-900",
		descClass: "text-gray-700",
		bulletTextClass: "text-gray-800",
		bulletIconClass: "bg-brandMaroon",
		btnClass: "bg-brandMaroon hover:bg-[#600f1e] text-white",
		numberClass: "from-black/10 to-transparent",
		items: ["Calendar management", "Email organization", "Data entry", "Research"],
	},
	{
		number: "02",
		title: "COMMS",
		desc: "For handling client and team interactions",
		glassClass:
			"bg-[length:300%_300%] bg-gradient-to-br from-brandMaroon/99 via-brandMaroon/80 to-brandMaroon/90 backdrop-blur-sm md:backdrop-blur-3xl border-[1.5px] border-white/30 shadow-lg md:shadow-[0_15px_40px_rgba(122,19,39,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3)]",
		titleClass: "text-white",
		descClass: "text-brandPink",
		bulletTextClass: "text-gray-100",
		bulletIconClass: "bg-brandPink",
		btnClass: "bg-white hover:bg-gray-100 text-brandMaroon",
		numberClass: "from-white/15 to-transparent",
		items: ["Inbox & email responses", "Client communication", "Meeting scheduling", "Follow-ups"],
	},
	{
		number: "03",
		title: "SOCIAL",
		desc: "For managing and posting social media content",
		glassClass:
			"bg-[length:300%_300%] bg-gradient-to-br from-brandPink/20 via-white/60 to-brandPink/30 backdrop-blur-sm md:backdrop-blur-3xl border-[1.5px] border-white/60 shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(255,255,255,0.3)]",
		titleClass: "text-gray-900",
		descClass: "text-gray-700",
		bulletTextClass: "text-gray-800",
		bulletIconClass: "bg-brandMaroon",
		btnClass: "bg-brandMaroon hover:bg-[#600f1e] text-white",
		numberClass: "from-black/10 to-transparent",
		items: ["Content management", "Content posting", "Graphic design", "Caption writing"],
	},
];

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

const aboutStats = [
	{ value: "400+", label: "Projects Completed" },
	{ value: "10+", label: "Industries Served" },
	{ value: "2+", label: "Years of Experience" },
];

const heroTickerItems = [
	"Admin Support",
	"Inbox Management",
	"Calendar Planning",
	"Client Communication",
	"Content Coordination",
	"Reliable Virtual Assistance",
];

const testimonialsData = [
	{
		name: "Akira B.",
		company: "Win with Barlow | EZMobileDNA",
		quote:
			"“Thank you for being committed to my business. You've made my life so much easier by taking things off my plate and handling them with care. I really appreciate your effort you put into everything you do.”",
	},
	{
		name: "Norhakim S.",
		company: "Mascon Tech | Seartify",
		quote:
			"“Hi Sheremie! I think you've been doing a splendid job so far by choosing the right articles and posts. Keep doing what you've done and maintain your great work ethics.”",
	},
	{
		name: "Lucy W.",
		company: "LW Business Innovations",
		quote:
			"“Omg, you did amazing. You're a natural talent and very fast! I am stunned by your work. It looks so goooood! Just a few mild changes but other than that, you are amazing!!!! Thank you so much.”",
	},
];

// --- MASTER PORTFOLIO PIPELINE ---
const allProjectsData: ProjectData[] = [
	{
		type: "tasks",
		client: "Win with Barlow",
		projects: [
			{
				image: "/portfolio/spreadsheet.png",
				overlay: "Client details hidden for confidentiality",
				desc: "Organized client concerns into a structured sheet to help streamline responses and ensure no inquiries were missed. This system made it easier to track, prioritize, and respond efficiently.",
			},
			{
				image: "/portfolio/inbox.png",
				overlay: "Client details hidden for confidentiality",
				desc: "Managed and organized client emails by categorizing messages and maintaining a clear workflow for timely and accurate responses.",
			},
		],
	},
	{
		type: "gallery",
		client: "EZ Mobile DNA",
		images: [
			"/portfolio/ez1.jpeg",
			"/portfolio/ez2.jpeg",
			"/portfolio/ez3.jpeg",
			"/portfolio/ez4.jpeg",
			"/portfolio/ez5.jpeg",
			"/portfolio/ez6.jpeg",
			"/portfolio/ez7.jpeg",
			"/portfolio/ez8.jpeg",
			"/portfolio/ez9.jpeg",
			"/portfolio/ez10.jpeg",
			"/portfolio/ez11.jpeg",
		],
	},
	{
		type: "tasks",
		client: "Mascon/Seartify",
		projects: [
			{
				image: "/portfolio/hakim1.jpg",
				desc: "Created and organized job board listings by formatting content clearly and ensuring accurate details for better visibility and accessibility.",
			},
			{
				image: "/portfolio/hakim2.jpg",
				desc: "Managed and formatted news articles for publishing, ensuring clear structure, readability, and consistent presentation across the platform.",
			},
		],
	},
	{
		type: "gallery",
		client: "Royal Suntech Corporation",
		subtitle: "Graphic Design Work Created During My Internship",
		desc: "Designed a range of graphics during my internship, focusing on visual clarity, brand consistency, and effective content presentation.",
		images: [
			"/portfolio/st1.jpg",
			"/portfolio/st2.jpg",
			"/portfolio/st3.jpg",
			"/portfolio/st4.jpg",
			"/portfolio/st5.jpg",
			"/portfolio/st6.jpg",
			"/portfolio/st7.jpg",
		],
		aspectClass: "aspect-[4/5]",
	},
];

// ==========================================
// 3. REUSABLE SECTION COMPONENTS
// ==========================================

const ServicesSection = ({ isMobile, isPhone }: { isMobile: boolean; isPhone: boolean }) => {
	const servicesRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: servicesRef, offset: ["start end", "end start"] });

	const r1 = isMobile ? [0.02, 0.2, 0.6, 0.99] : [0.0, 0.3, 0.7, 0.96];
	const r2 = isMobile ? [0.04, 0.3, 0.7, 0.99] : [0.0, 0.35, 0.72, 0.98];
	const r3 = isMobile ? [0.07, 0.4, 0.88, 1.0] : [0.0, 0.38, 0.75, 1.0];

	const y1 = useTransform(scrollYProgress, r1, [400, 0, 0, -400]);
	const y2 = useTransform(scrollYProgress, r2, [400, 0, 0, -500]);
	const y3 = useTransform(scrollYProgress, r3, [400, 0, 0, -400]);

	const scale1 = useTransform(scrollYProgress, r1, [0.8, 1, 1, 0.8]);
	const scale2 = useTransform(scrollYProgress, r2, [0.8, 1, 1, 0.8]);
	const scale3 = useTransform(scrollYProgress, r3, [0.8, 1, 1, 0.8]);

	const op1Range = isMobile ? [0.1, 0.4, 0.9, 0.95] : [0.1, 0.3, 0.75, 0.85];
	const op2Range = isMobile ? [0.15, 0.45, 0.92, 0.98] : [0.15, 0.4, 0.8, 0.9];
	const op3Range = isMobile ? [0.2, 0.5, 0.95, 1.0] : [0.2, 0.5, 0.55, 0.95];

	const opacity1 = useTransform(scrollYProgress, op1Range, [0, 1, 1, 0]);
	const opacity2 = useTransform(scrollYProgress, op2Range, [0, 1, 1, 0]);
	const opacity3 = useTransform(scrollYProgress, op3Range, [0, 1, 1, 0]);

	const transforms = [
		{ y: y1, scale: scale1, opacity: opacity1 },
		{ y: y2, scale: scale2, opacity: opacity2 },
		{ y: y3, scale: scale3, opacity: opacity3 },
	];

	return (
		<section
			ref={servicesRef}
			id='services'
			className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 z-40 overflow-x-clip'
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

			{/* Grid updated: md:grid-cols-2 lg:grid-cols-3. Index 2 (3rd item) spans 2 columns on tablet! */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
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
						transition={{ duration: [13.84, 15.48, 18.99][index], ease: "easeInOut", repeat: Infinity }}
						style={{
							y: isMobile ? 0 : transforms[index].y,
							scale: isMobile ? 1 : transforms[index].scale,
							opacity: isMobile ? 1 : transforms[index].opacity,
						}}
						className={`relative overflow-hidden flex flex-col justify-between rounded-[2rem] p-8 pb-10 md:p-10 md:pb-12 transition-shadow ${service.glassClass} ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
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
							className={`w-full relative z-20 py-3.5 rounded-full font-bold tracking-wider text-sm transition-colors shadow-lg ${service.btnClass}`}
						>
							GET STARTED
						</button>
					</motion.div>
				))}
			</div>
		</section>
	);
};

const ToolsSection = () => (
	<section
		id='tools'
		className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-32 md:pt-24 md:pb-48 z-40 overflow-x-clip'
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
);

const AboutSection = () => {
	const shouldReduceMotion = useReducedMotion();
	const aboutContainerVariants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : 0.12,
				delayChildren: shouldReduceMotion ? 0 : 0.08,
			},
		},
	};
	const aboutItemVariants = {
		hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.62,
				ease: [0.22, 1, 0.36, 1] as const,
			},
		},
	};
	const aboutStatsVariants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : 0.08,
				delayChildren: shouldReduceMotion ? 0 : 0.02,
			},
		},
	};

	return (
		<section id='about' className='py-16 md:py-24'>
			<motion.div
				initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
				className='flex justify-center mb-6'
			>
				<div className='flex items-center gap-3'>
					<div className='w-6 h-[1px] bg-white/60'></div>
					<span className='text-white/80 text-sm font-medium tracking-wide uppercase'>About Me</span>
				</div>
			</motion.div>
			<div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-6 items-center'>
				<motion.div
					initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
					className='relative w-full mx-auto flex justify-center mt-8 lg:mt-0'
				>
					<Image
						src='/sherAboutMe.png'
						alt='Sheremie'
						width={600}
						height={600}
						className='w-full h-auto object-contain drop-shadow-xl'
					/>
				</motion.div>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
					variants={aboutContainerVariants}
					className='flex flex-col gap-6 text-white text-center lg:text-left'
				>
					<motion.h2 variants={aboutItemVariants} className='text-4xl md:text-5xl font-bold leading-tight'>
						Who is <span className='text-brandPink italic'>Sheremie?</span>
					</motion.h2>
					<motion.p variants={aboutItemVariants} className='text-white/80 text-sm md:text-base leading-relaxed'>
						I&apos;m Sheremie, a Virtual Assistant and Marketing Management student who helps business owners stay
						organized and on track. With experience in admin support, content management, and client coordination, I
						focus on making day-to-day tasks easier and more manageable. I&apos;m detail-oriented, reliable, and
						committed to delivering support that actually makes a difference.
					</motion.p>
					<motion.p variants={aboutItemVariants} className='text-white/80 text-sm md:text-base leading-relaxed'>
						I&apos;m always improving my skills and learning better systems to provide efficient and consistent support
						for every client I work with. Let&apos;s work together and make your workload lighter.
					</motion.p>
					<motion.div variants={aboutStatsVariants} className='grid grid-cols-3 gap-4 my-4'>
						{aboutStats.map((stat) => (
							<motion.div key={stat.label} variants={aboutItemVariants}>
								<h4 className='text-3xl md:text-4xl font-bold mb-1'>{stat.value}</h4>
								<p className='text-white/70 text-xs md:text-sm'>{stat.label}</p>
							</motion.div>
						))}
					</motion.div>
					<motion.div variants={aboutItemVariants} className='pt-4 flex justify-center lg:justify-start'>
						<button className='bg-white hover:bg-gray-100 text-brandMaroon px-8 py-3.5 rounded-full text-sm font-bold transition-colors shadow-lg'>
							Work With Me
						</button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

const ExperienceSection = ({ isPhone }: { isPhone: boolean }) => {
	const experienceRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: experienceRef, offset: ["start end", "end start"] });

	const expCard1X = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [-400, 0, 0, -400]);
	const expCard2X = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [400, 0, 0, 400]);
	const expScale = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [0.8, 1, 1, 0.8]);
	const expOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

	return (
		<section ref={experienceRef} id='experience' className='pt-24 md:pt-32 pb-24 md:pb-32 overflow-x-clip'>
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
				<motion.div
					style={{ x: isPhone ? 0 : expCard1X, scale: isPhone ? 1 : expScale, opacity: isPhone ? 1 : expOpacity }}
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

				<motion.div
					style={{ x: isPhone ? 0 : expCard2X, scale: isPhone ? 1 : expScale, opacity: isPhone ? 1 : expOpacity }}
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
	);
};

const TaskProject = ({ work }: { work: TaskProjectData }) => (
	<div className='w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-32 md:mb-48 last:mb-0'>
		<motion.h3
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5 }}
			className='text-2xl md:text-3xl font-bold italic text-center text-gray-900 mb-12'
		>
			{work.client}
		</motion.h3>
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
			{work.projects.map((project, pIdx) => (
				<motion.div
					key={pIdx}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.5, delay: pIdx * 0.2 }}
					className='flex flex-col items-center gap-6'
				>
					<div className='relative w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden shadow-md group'>
						<Image src={project.image} alt='Portfolio Project' fill className='object-cover' />
						{project.overlay && (
							<div className='absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none'>
								<div className='bg-brandMaroon text-white italic font-medium px-4 py-1.5 rounded shadow-lg text-sm md:text-base text-center'>
									{project.overlay}
								</div>
							</div>
						)}
					</div>
					<p className='text-gray-900 text-sm md:text-base leading-relaxed text-center max-w-lg font-medium'>
						{project.desc}
					</p>
				</motion.div>
			))}
		</div>
	</div>
);

const GraphicDesignGallery = ({ work, isDesktopLarge }: { work: GraphicDesignProject; isDesktopLarge: boolean }) => {
	const [images, setImages] = useState<string[]>(work.images || []);
	const [hasEntered, setHasEntered] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	const aspectClass = work.aspectClass || "aspect-square";
	const deskWidthClass = work.aspectClass === "aspect-[4/5]" ? "w-[240px] lg:w-[280px]" : "w-[300px] lg:w-[350px]";
	const mobWidthClass = work.aspectClass === "aspect-[4/5]" ? "w-[220px] md:w-[280px]" : "w-[260px] md:w-[340px]";

	const handleSwap = (clickedImg: string) => {
		setHasInteracted(true);
		setImages((prev: string[]) => {
			const newArr = [...prev];
			const idx = newArr.indexOf(clickedImg);
			if (idx === 0) return newArr;

			const temp = newArr[0];
			newArr[0] = newArr[idx];
			newArr[idx] = temp;
			return newArr;
		});
	};

	return (
		<div className='mb-32 md:mb-48 last:mb-0 flex flex-col items-center w-full'>
			{/* Title & Subtitle ABOVE the gallery */}
			<div className='w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center'>
				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.5 }}
					className='text-3xl md:text-4xl font-bold italic text-center text-gray-900 mb-2'
				>
					{work.client}
				</motion.h3>
				{work.subtitle && (
					<motion.h4
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='text-lg md:text-xl font-bold text-gray-800 text-center mb-8'
					>
						{work.subtitle}
					</motion.h4>
				)}
			</div>

			{!isDesktopLarge ? (
				// Reduced py-8 to py-2 to tighten mobile spacing
				<div className='relative w-full py-2 overflow-hidden flex'>
					<motion.div
						className='flex gap-4 md:gap-6 w-max'
						animate={{ x: ["0%", "-50%"] }}
						transition={{ duration: images.length * 4, ease: "linear", repeat: Infinity }}
					>
						{[...images, ...images].map((img: string, i: number) => (
							<div
								key={i}
								className={`relative ${mobWidthClass} ${aspectClass} rounded-2xl overflow-hidden shadow-lg shrink-0 border-[3px] border-white bg-gray-100`}
							>
								<Image src={img} alt={`${work.client} design`} fill className='object-cover' />
							</div>
						))}
					</motion.div>
				</div>
			) : (
				<motion.div
					onViewportEnter={() => setHasEntered(true)}
					viewport={{ once: true, amount: 0.1 }}
					onMouseEnter={() => {
						setIsHovered(true);
						setHasInteracted(true);
					}}
					onMouseLeave={() => setIsHovered(false)}
					// Tightened mt/mb to keep gallery close to text
					className='relative isolate w-full h-[500px] lg:h-[600px] flex items-center justify-center mt-0 mb-4'
				>
					{images.map((img: string, i: number) => {
						const isCenter = i === 0;
						const direction = i % 2 === 0 ? 1 : -1;
						const step = Math.ceil(i / 2);

						const maxStep = Math.max(1, Math.floor((images.length - 1) / 2));

						const spreadX_rest = 40;
						const targetX_rest = isCenter ? 0 : direction * step * spreadX_rest;
						const targetY_rest = isCenter ? 0 : step * 3;
						const targetRotate_rest = isCenter ? 0 : direction * step * 2;

						const maxExplosion = 450;
						const spreadX_hover = maxExplosion / maxStep;
						const targetX_hover = isCenter ? 0 : direction * step * spreadX_hover;
						const targetY_hover = isCenter ? -30 : step * 20;
						const targetRotate_hover = isCenter ? 0 : direction * step * 8;

						const zIndex = images.length - i;

						const currentX = !hasEntered ? 0 : isHovered ? targetX_hover : targetX_rest;
						const currentY = !hasEntered ? (isCenter ? 200 : 0) : isHovered ? targetY_hover : targetY_rest;
						const currentScale = !hasEntered ? (isCenter ? 1 : 0.8) : isHovered ? 1.05 : 1;
						const currentRotate = !hasEntered
							? isCenter
								? -5
								: 0
							: isHovered
								? targetRotate_hover
								: targetRotate_rest;
						const currentOpacity = !hasEntered ? 0 : 1;

						return (
							<motion.div
								layout
								key={img}
								onClick={() => handleSwap(img)}
								initial={{
									y: isCenter ? 200 : 0,
									x: 0,
									opacity: 0,
									scale: isCenter ? 1 : 0.8,
									rotate: isCenter ? -5 : 0,
								}}
								animate={{
									x: currentX,
									y: currentY,
									scale: currentScale,
									rotate: currentRotate,
									opacity: currentOpacity,
								}}
								transition={{
									duration: isHovered ? 0.5 : 0.8,
									type: "spring",
									bounce: isHovered ? 0.3 : 0.4,
									delay: !hasEntered || hasInteracted ? 0 : isCenter ? 0.3 : 0.8 + i * 0.05,
								}}
								className={`absolute ${deskWidthClass} ${aspectClass} rounded-xl overflow-hidden shadow-2xl border-[3px] border-white bg-gray-100 cursor-pointer`}
								style={{ zIndex }}
							>
								<Image src={img} alt={`${work.client} design`} fill className='object-cover' />
							</motion.div>
						);
					})}
				</motion.div>
			)}

			{/* Description tightly BELOW the gallery */}
			{work.desc && (
				<div className='w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center'>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='text-sm md:text-base text-gray-600 text-center max-w-3xl leading-relaxed mt-4'
					>
						{work.desc}
					</motion.p>
				</div>
			)}
		</div>
	);
};

// --- TESTIMONIALS SECTION ---
const TestimonialsSection = () => {
	return (
		<section id='testimonials' className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6 }}
				className='flex flex-col mb-16 md:mb-20'
			>
				<div className='flex items-center gap-3 mb-4'>
					<div className='w-6 h-[2px] bg-white/60'></div>
					<span className='text-white/80 text-sm font-medium tracking-wide uppercase'>Testimonials</span>
				</div>
				<h2 className='text-4xl md:text-5xl font-bold text-white leading-tight'>
					What Clients <span className='italic text-brandPink'>Say</span>
				</h2>
			</motion.div>

			{/* Grid updated to center the 3rd item nicely on tablets (md breakpoint) */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-12 items-stretch'>
				{testimonialsData.map((test, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: i * 0.2 }}
						className={`relative group w-full h-full ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
					>
						{/* THICKER BORDER AND SHARPER ANGLE (-13deg) */}
						<div className='absolute inset-0 border-[3px] border-white/50 rounded-[2rem] transform -rotate-[13deg] transition-transform duration-300 group-hover:-rotate-[8deg]'></div>

						<div className='relative bg-white rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col items-center text-center h-full'>
							<h4 className='text-lg md:text-xl font-bold text-gray-900'>{test.name}</h4>
							<p className='text-xs md:text-sm text-gray-500 mb-4'>{test.company}</p>

							<div className='flex items-center gap-1 mb-6 text-brandMaroon'>
								{[...Array(5)].map((_, starIdx) => (
									<Star key={starIdx} size={18} fill='currentColor' />
								))}
							</div>

							<p className='text-sm md:text-base text-gray-700 italic leading-relaxed font-medium'>{test.quote}</p>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

// --- NEW CONTACT / FOOTER SECTION ---
const ContactSection = () => {
	const shouldReduceMotion = useReducedMotion();
	const footerViewport = { once: true, margin: "-80px" };
	const footerStaggerVariants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : 0.14,
				delayChildren: shouldReduceMotion ? 0 : 0.06,
			},
		},
	};
	const footerRevealVariants = {
		hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.65,
				ease: [0.22, 1, 0.36, 1] as const,
			},
		},
	};
	const footerNestedVariants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : 0.08,
				delayChildren: shouldReduceMotion ? 0 : 0.04,
			},
		},
	};
	const footerItemVariants = {
		hidden: {
			opacity: 0,
			x: shouldReduceMotion ? 0 : -16,
			y: shouldReduceMotion ? 0 : 10,
		},
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.5,
				ease: [0.22, 1, 0.36, 1] as const,
			},
		},
	};
	const socialHover = shouldReduceMotion ? {} : { y: -3, scale: 1.05 };

	return (
		<motion.section
			id='contact'
			className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-12 z-40 text-white'
			initial='hidden'
			whileInView='visible'
			viewport={footerViewport}
			variants={footerStaggerVariants}
		>
			<motion.div variants={footerRevealVariants} className='flex flex-col mb-12 md:mb-16'>
				<div className='flex items-center gap-3 mb-4'>
					<div className='w-6 h-[1px] bg-white/60'></div>
					<span className='text-white/80 text-sm font-medium tracking-wide uppercase'>Contact</span>
				</div>
				<h2 className='text-4xl md:text-5xl font-bold leading-tight'>
					Let&apos;s <span className='italic text-brandPink'>Connect!</span>
				</h2>
			</motion.div>

			<motion.hr variants={footerRevealVariants} className='border-t-[3px] border-white/20 mb-12 md:mb-16' />

			<div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8'>
				<motion.div variants={footerRevealVariants} className='flex flex-col gap-6'>
					<motion.div variants={footerNestedVariants} className='flex flex-col gap-6'>
						<motion.div variants={footerItemVariants} className='flex items-center gap-3'>
							<div className='relative w-10 h-10 rounded-full overflow-hidden border-[1.5px] border-white'>
								<Image src='/sbmLogo.png' alt='Logo' fill className='object-cover' />
								<div className='absolute inset-0 bg-brandPink -z-10'></div>
							</div>
							<span className='text-2xl font-semibold'>Sheremie</span>
						</motion.div>
						<motion.p variants={footerItemVariants} className='text-sm md:text-base leading-relaxed text-white/90 font-medium'>
							Need help managing your tasks and staying organized? I&apos;m here to support you! Let&apos;s work
							together to make your day easier.
						</motion.p>
						<motion.p variants={footerItemVariants} className='text-sm italic text-white/80 leading-relaxed font-medium'>
							Based in the Philippines (GMT+8)
							<br />
							Open to international clients
							<br />
							Replies within 24 hours
						</motion.p>
						<motion.div variants={footerItemVariants} className='flex items-center gap-4 mt-2'>
						{/* Phone */}
						<motion.a
							whileHover={socialHover}
							href='#'
							className='w-8 h-8 bg-white rounded-full flex items-center justify-center text-brandMaroon hover:bg-brandPink hover:text-white transition-colors'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'></path>
							</svg>
						</motion.a>

						{/* Instagram */}
						<motion.a
							whileHover={socialHover}
							href='#'
							className='w-8 h-8 bg-white rounded-full flex items-center justify-center text-brandMaroon hover:bg-brandPink hover:text-white transition-colors'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect>
								<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
								<line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
							</svg>
						</motion.a>

						{/* Facebook */}
						<motion.a
							whileHover={socialHover}
							href='#'
							className='w-8 h-8 bg-white rounded-full flex items-center justify-center text-brandMaroon hover:bg-brandPink hover:text-white transition-colors'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
							</svg>
						</motion.a>

						{/* Mail */}
						<motion.a
							whileHover={socialHover}
							href='#'
							className='w-8 h-8 bg-white rounded-full flex items-center justify-center text-brandMaroon hover:bg-brandPink hover:text-white transition-colors'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
								<polyline points='22,6 12,13 2,6'></polyline>
							</svg>
						</motion.a>
						</motion.div>
					</motion.div>
				</motion.div>

				<motion.div variants={footerRevealVariants} className='flex flex-col gap-4 md:pl-12'>
					<motion.div variants={footerNestedVariants} className='flex flex-col gap-4'>
						<motion.h4 variants={footerItemVariants} className='text-lg font-semibold text-white/80 mb-2'>
							Navigation
						</motion.h4>
						{["Home", "Services", "About Me", "Portfolio", "Testimonials"].map((link) => (
							<motion.a
								key={link}
								variants={footerItemVariants}
								href={`#${link.toLowerCase().replace(" ", "-")}`}
								className='text-sm md:text-base font-medium hover:text-brandPink transition-colors'
							>
								{link}
							</motion.a>
						))}
					</motion.div>
				</motion.div>

				<motion.div variants={footerRevealVariants} className='flex flex-col gap-4'>
					<motion.div variants={footerNestedVariants} className='flex flex-col gap-4'>
						<motion.h4 variants={footerItemVariants} className='text-lg font-semibold text-white/80 mb-2'>
							Contact
						</motion.h4>
						<motion.p variants={footerItemVariants} className='text-sm md:text-base font-medium'>
							+63 961 482 3645
						</motion.p>
						<motion.p variants={footerItemVariants} className='text-sm md:text-base font-medium'>
							sheremiebmiranda@gmail.com
						</motion.p>
					</motion.div>
				</motion.div>
			</div>

			<motion.div variants={footerRevealVariants} className='mt-24 text-center text-xs font-medium text-white/60'>
				&copy; 2026 Sheremie B. Miranda. All Rights Reserved.
			</motion.div>
		</motion.section>
	);
};

// ==========================================
// 4. MAIN PAGE COMPONENT
// ==========================================
export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [hasIntroStarted, setHasIntroStarted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isPhone, setIsPhone] = useState(false);
	const [isDesktopLarge, setIsDesktopLarge] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		const checkBreakpoints = () => {
			setIsMobile(window.innerWidth < 1024);
			setIsPhone(window.innerWidth < 768);
			setIsDesktopLarge(window.innerWidth >= 1300);
		};
		checkBreakpoints();
		window.addEventListener("resize", checkBreakpoints);
		return () => window.removeEventListener("resize", checkBreakpoints);
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

	const helloVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
	};
	const titleVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.35 } },
	};
	const fadeVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { delay: 0.85, duration: 0.8 } },
	};
	const letterVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};
	const heroTickerDuration = isPhone ? "28s" : isMobile ? "32s" : "49.2s";

	return (
		<div
			className='min-h-screen flex flex-col overflow-x-hidden isolate'
			style={{ backgroundImage: 'url("/prism.svg")', backgroundRepeat: "repeat" }}
		>
			<AnimatePresence onExitComplete={() => setHasIntroStarted(true)}>
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

			<main
				id='home'
				onMouseMove={handleMouseMove}
				className='relative overflow-x-clip px-6 pt-32 pb-24 md:px-12 md:pt-40 md:pb-28 lg:px-24 lg:pt-44 lg:pb-32'
			>
				<div className='relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-12'>
					<div className='flex flex-col gap-4 md:gap-6 w-full mt-2 md:mt-0 pr-0 lg:pr-8'>
						<motion.h2
							variants={helloVariants}
							initial='hidden'
							animate={hasIntroStarted ? "visible" : "hidden"}
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
							animate={hasIntroStarted ? "visible" : "hidden"}
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
							animate={hasIntroStarted ? "visible" : "hidden"}
							className='flex flex-col gap-4 md:gap-6'
						>
							<p className='text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-md'>
								I&apos;m Sheremie, I help you stay organized, manage your tasks, and keep your business running smoothly
								so you can focus on what matters most.
							</p>
							<p className='text-xs md:text-sm text-gray-500 italic'>Currently available for 2-3 new clients</p>
							<div className='pt-2'>
								<AnimatedButton href='#contact' size='lg' className='min-w-[214px]'>
									Hire Me!
								</AnimatedButton>
							</div>
						</motion.div>
					</div>
					<div className='relative flex justify-center lg:justify-end pointer-events-none'>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={hasIntroStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className='relative z-10 w-full max-w-[350px] translate-y-4 sm:max-w-[420px] sm:translate-y-6 md:max-w-[460px] md:translate-y-8 lg:max-w-[520px] lg:translate-y-10 xl:max-w-[620px] 2xl:max-w-[680px]'
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
								className='pointer-events-auto h-auto max-h-[58vh] w-full object-contain object-bottom sm:max-h-[62vh] md:max-h-[66vh] lg:max-h-[72vh]'
								priority
							/>
							<motion.div
								style={{ x: tooltip1X, y: tooltip1Y }}
								className='absolute right-[2%] md:right-0 lg:right-[-2%] bottom-[45%] md:bottom-[40%] z-30 pointer-events-auto'
							>
								<motion.div
									animate={hasIntroStarted ? { y: [0, -8, 0] } : { y: 0 }}
									transition={{ repeat: hasIntroStarted ? Infinity : 0, duration: 3, ease: "easeInOut" }}
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
									animate={hasIntroStarted ? { y: [0, 8, 0] } : { y: 0 }}
									transition={{ repeat: hasIntroStarted ? Infinity : 0, duration: 4, ease: "easeInOut" }}
									className='relative bg-brandMaroon text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium shadow-lg whitespace-nowrap'
								>
									Your Virtual Assistant
									<div className='absolute -top-1.5 md:-top-2 left-4 md:left-6 w-0 h-0 border-x-[4px] md:border-x-[6px] border-x-transparent border-b-[6px] md:border-b-[8px] border-b-brandMaroon'></div>
								</motion.div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				<div className='absolute inset-x-0 bottom-0 z-20 flex h-[4.75rem] -translate-y-2 items-center overflow-hidden border-t border-white/10 bg-brandMaroon shadow-[0_-14px_32px_rgba(122,19,39,0.18)] md:h-[5.25rem] md:-translate-y-3'>
					<p className='sr-only'>{heroTickerItems.join(", ")}.</p>
					<div className='w-full overflow-hidden px-9'>
						<div
							aria-hidden='true'
							className={`hero-ticker-track flex w-max items-center whitespace-nowrap ${
								hasIntroStarted && !shouldReduceMotion ? "hero-ticker-track--animated" : ""
							}`}
							style={hasIntroStarted && !shouldReduceMotion ? { animationDuration: heroTickerDuration } : undefined}
						>
							{[0, 1].map((copyIndex) => (
								<div key={copyIndex} className='flex shrink-0 items-center gap-9 pr-9'>
									{heroTickerItems.map((item, index) => (
										<div key={`${copyIndex}-${item}-${index}`} className='flex shrink-0 items-center gap-9 text-white'>
											<span className='text-[14px] md:text-[19px] lg:text-[22px] font-semibold uppercase tracking-[0.22em] md:tracking-[0.24em] lg:tracking-[0.26em]'>
												{item}
											</span>
											<Star size={13} fill='currentColor' strokeWidth={1.5} className='shrink-0' />
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</main>

			<ServicesSection isMobile={isMobile} isPhone={isPhone} />
			<ToolsSection />

			<div
				className='relative w-full bg-[#6b1626] z-40'
				style={{ backgroundImage: 'url("/prismMaroon.svg")', backgroundRepeat: "repeat" }}
			>
				<AboutSection />
				<ExperienceSection isPhone={isPhone} />
			</div>

			<section id='portfolio' className='relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 z-40'>
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
			</section>

			{allProjectsData.map((project, idx) => {
				if (project.type === "tasks") {
					return <TaskProject key={idx} work={project as TaskProjectData} />;
				}
				if (project.type === "gallery") {
					return (
						<GraphicDesignGallery key={idx} work={project as GraphicDesignProject} isDesktopLarge={isDesktopLarge} />
					);
				}
				return null;
			})}

			<div
				className='relative w-full bg-[#6b1626] z-40'
				style={{ backgroundImage: 'url("/prismMaroon.svg")', backgroundRepeat: "repeat" }}
			>
				<TestimonialsSection />
				<ContactSection />
			</div>
		</div>
	);
}

