"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const links = [
	{ href: "/exec", label: "exec" },
	{ href: "/calendar", label: "calendar" },
	{ href: "/contact", label: "join" },
];

export default function NavBar() {
	const [logoHovered, setLogoHovered] = React.useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";

	return (
		<header
			className={`z-50 w-full border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md ${
				isHome ? "absolute top-0 left-0" : "sticky top-0"
			}`}
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
				<Link
					href="/"
					onMouseEnter={() => setLogoHovered(true)}
					onMouseLeave={() => setLogoHovered(false)}
					className="flex items-center gap-3"
				>
					<Image
						src={logoHovered ? "/images/accent-logo.svg" : "/images/logo.svg"}
						alt="AAA Logo"
						width={48}
						height={48}
						className="h-10 w-10 object-cover sm:h-12 sm:w-12"
					/>
					<span className="hidden font-bold text-foreground sm:inline">
						MIT AAA
					</span>
				</Link>

				<nav className="flex items-center gap-1 sm:gap-2">
					{links.map((link) => {
						const isActive =
							pathname === link.href || pathname.startsWith(`${link.href}/`);

						return (
							<Link
								key={link.href}
								href={link.href}
								className={`rounded-full px-3 py-1.5 text-sm font-bold transition-colors sm:px-4 sm:text-base ${
									isActive
										? "bg-accent/10 text-accent"
										: "text-foreground hover:bg-muted hover:text-accent"
								}`}
							>
								{link.label}
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
}
