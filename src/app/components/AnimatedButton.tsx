"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type AnimatedButtonProps = {
	children: ReactNode;
	className?: string;
	fullWidth?: boolean;
	href?: string;
	onClick?: () => void;
	size?: "sm" | "md" | "lg";
	type?: "button" | "submit" | "reset";
	variant?: "maroon" | "light";
};

const sizeStyles = {
	sm: {
		button: "h-12 min-w-[176px] px-16 text-sm",
		chip: "h-10 w-10",
		target: "calc(100% - 2.75rem)",
	},
	md: {
		button: "h-14 min-w-[216px] px-20 text-base",
		chip: "h-12 w-12",
		target: "calc(100% - 3.25rem)",
	},
	lg: {
		button: "h-16 min-w-[240px] px-24 text-lg",
		chip: "h-12 w-12",
		target: "calc(100% - 3.75rem)",
	},
};

const variantStyles = {
	maroon: {
		button:
			"border-brandMaroon bg-brandMaroon text-white shadow-[0_14px_28px_rgba(122,19,39,0.22)] hover:bg-[#600f1e]",
		chip: "bg-white text-brandMaroon",
	},
	light: {
		button:
			"border-brandMaroon/70 bg-white text-brandMaroon shadow-[0_14px_28px_rgba(0,0,0,0.08)] hover:bg-[#f6edf0]",
		chip: "bg-brandMaroon text-white",
	},
};

export default function AnimatedButton({
	children,
	className = "",
	fullWidth = false,
	href,
	onClick,
	size = "md",
	type = "button",
	variant = "maroon",
}: AnimatedButtonProps) {
	const sizeConfig = sizeStyles[size];
	const variantConfig = variantStyles[variant];
	const customStyle = {
		"--button-chip-target": sizeConfig.target,
	} as CSSProperties;

	const buttonClassName = [
		"group relative inline-flex items-center justify-center overflow-hidden rounded-full border font-semibold tracking-[0.01em]",
		"transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPink/70 focus-visible:ring-offset-2",
		sizeConfig.button,
		variantConfig.button,
		fullWidth ? "w-full min-w-0" : "w-fit",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const content = (
		<>
			<span className='relative z-10 block whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-3'>
				{children}
			</span>
			<span
				className={`absolute left-2 top-2 flex items-center justify-center rounded-full shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:left-[var(--button-chip-target)] group-hover:rotate-180 ${sizeConfig.chip} ${variantConfig.chip}`}
			>
				<ArrowRight size={size === "lg" ? 22 : 20} strokeWidth={2.2} />
			</span>
		</>
	);

	if (href) {
		return (
			<Link href={href} className={buttonClassName} style={customStyle}>
				{content}
			</Link>
		);
	}

	return (
		<button type={type} onClick={onClick} className={buttonClassName} style={customStyle}>
			{content}
		</button>
	);
}
