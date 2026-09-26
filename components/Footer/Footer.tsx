import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-auto border-t border-border bg-card">
			<div className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
				<p className="font-bold text-foreground">
					MIT Asian American Association
				</p>
				<div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-6">
					<Link
						href="mailto:aaa-exec@mit.edu"
						className="font-semibold text-accent hover:underline"
					>
						aaa-exec@mit.edu
					</Link>
					<Link
						href="http://instagram.com/asiansatmit/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-foreground hover:text-accent"
					>
						<Instagram className="h-4 w-4" />
						@asiansatmit
					</Link>
				</div>
			</div>
		</footer>
	);
}
