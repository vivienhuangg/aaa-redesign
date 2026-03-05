import { Cardo, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat",
});

const cardo = Cardo({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-cardo",
});

export const metadata = {
	title: "MIT AAA - Asian American Association",
	description:
		"MIT Asian American Association - Building community and celebrating heritage",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={`${montserrat.variable} ${cardo.variable} font-sans antialiased min-h-screen flex flex-col bg-white`}
			>
				<div className="flex-1 flex flex-col">
					{children}
				</div>
				<footer className="border-t bg-white/80 backdrop-blur">
					<div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 px-4 py-4 text-xs text-gray-600 sm:grid-cols-3 sm:items-center">
						<a
							href="mailto:aaa-exec@mit.edu"
							className="hover:text-gray-900 underline-offset-2 hover:underline order-2 sm:order-1"
						>
							aaa-exec@mit.edu
						</a>
						<p className="leading-snug order-1 sm:order-2 text-center">
							© {new Date().getFullYear()} Massachusetts Institute of Technology
						</p>
						<a
							href="https://accessibility.mit.edu/"
							target="_blank"
							rel="noreferrer"
							className="hover:text-gray-900 underline-offset-2 hover:underline order-3 text-right"
						>
							Accessibility
						</a>
					</div>
				</footer>
			</body>
		</html>
	);
}
