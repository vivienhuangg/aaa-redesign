import Image from "next/image";
import Link from "next/link";
import * as React from "react";

/**
 * @typedef {Object} NavBarProps

 */

/**
 * @param {NavBarProps} props
 */
export default function NavBar() {
	const [logoHovered, setLogoHovered] = React.useState(false);
	const linkClass =
		"text-foreground hover:text-accent hover:underline underline-offset-4 transition-colors font-medium px-2";

	return (
		<header className="fixed top-0 left-0 w-full z-50">
			<div className="px-4 py-4 transition-all">
				<div className="flex items-center justify-between font-bold">
					<Link
						href="/"
						onMouseEnter={() => setLogoHovered(true)}
						onMouseLeave={() => setLogoHovered(false)}
					>
						<Image
							src={logoHovered ? "/images/accent-logo.svg" : "/images/logo.svg"}
							alt="AAA Logo"
							width={64}
							height={64}
							className="object-cover"
							style={{
								width: "clamp(2rem, 4vw, 4rem)",
								height: "clamp(2rem, 4vw, 4rem)",
							}}
						/>
					</Link>

					<nav className=" md:flex" style={{ gap: "clamp(1rem, 3vw, 3rem)" }}>
						<Link
							href="/exec"
							className={linkClass}
							style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
						>
							exec
						</Link>
						<Link
							href="/calendar"
							className={linkClass}
							style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
						>
							calendar
						</Link>
						<Link
							href="/contact"
							className={linkClass}
							style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
						>
							contact us!
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
