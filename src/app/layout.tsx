import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Import Montserrat
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sheremie | Virtual Assistant",
	description: "Your go-to virtual assistant.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// scroll-smooth enables smooth sliding between single-page sections
		<html lang='en' className='scroll-smooth snap-y snap-proximity'>
			<body className={montserrat.className}>{children}</body>
		</html>
	);
}
