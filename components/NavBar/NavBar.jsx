import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function NavBar() {
	const [logoHovered, setLogoHovered] = React.useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const menuRef = React.useRef(null);

	const linkClass =
		"text-foreground hover:text-accent hover:underline underline-offset-4 transition-colors font-medium px-2";
	const mobileLinkClass =
		"block w-full text-left text-foreground hover:text-accent hover:underline underline-offset-4 rounded-md transition-colors font-medium py-3 px-4 text-lg";

	// Lock scroll when menu is open
	React.useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
	}, [mobileMenuOpen]);

	// Close on outside click
	React.useEffect(() => {
		function handleClickOutside(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMobileMenuOpen(false);
			}
		}
		if (mobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [mobileMenuOpen]);

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-transparent">
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

					{/* Desktop Navigation */}
					<nav
						className="hidden md:flex"
						style={{ gap: "clamp(1rem, 3vw, 3rem)" }}
					>
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

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2"
						onClick={() => setMobileMenuOpen(true)}
						aria-label="Open mobile menu"
					>
						<span className="block w-4 h-0.5 bg-foreground mb-1 transition-transform" />
						<span className="block w-4 h-0.5 bg-foreground mb-1" />
						<span className="block w-4 h-0.5 bg-foreground transition-transform" />
					</button>
				</div>
			</div>

			{/* Mobile Drawer */}
			<div
				ref={menuRef}
				className={`
          fixed inset-y-0 right-0 w-1/2 max-w-xs bg-background 
          transform transition-transform duration-300 ease-in-out z-40
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
				role="dialog"
				aria-modal="true"
			>
				<div className="flex items-center justify-between px-4 py-3 border-b border-muted">
					<span className="text-lg font-bold">Menu</span>
					<button
						onClick={() => setMobileMenuOpen(false)}
						aria-label="Close mobile menu"
						className="p-1"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex flex-col mt-4 space-y-2 px-2">
					<Link
						href="/exec"
						className={mobileLinkClass}
						onClick={() => setMobileMenuOpen(false)}
					>
						exec
					</Link>
					<Link
						href="/calendar"
						className={mobileLinkClass}
						onClick={() => setMobileMenuOpen(false)}
					>
						calendar
					</Link>
					<Link
						href="/contact"
						className={mobileLinkClass}
						onClick={() => setMobileMenuOpen(false)}
					>
						contact us!
					</Link>
				</nav>
			</div>
		</header>
	);
}
