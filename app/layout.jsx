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
				className={`${montserrat.variable} ${cardo.variable} font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
