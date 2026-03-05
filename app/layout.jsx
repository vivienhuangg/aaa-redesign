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
					<div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
						<p className="leading-snug">
							© {new Date().getFullYear()} Massachusetts Institute of Technology
						</p>
						<div className="flex flex-wrap items-center gap-4">
							<a
								href="mailto:accessibility@mit.edu"
								className="hover:text-gray-900 underline-offset-2 hover:underline"
							>
								accessibility@mit.edu
							</a>
							<a
								href="https://accessibility.mit.edu/"
								target="_blank"
								rel="noreferrer"
								className="hover:text-gray-900 underline-offset-2 hover:underline"
							>
								Accessibility
							</a>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
