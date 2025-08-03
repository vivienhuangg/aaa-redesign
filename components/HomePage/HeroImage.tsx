import Image from "next/image";
import * as React from "react";

export default function HeroImage() {
	return (
		<section className="relative w-full">
			<div className="relative">
				<Image
					src="/images/groupPhoto.jpg"
					alt="MIT AAA Group Photo"
					width={1920}
					height={1080}
					className="w-full h-auto object-cover"
				/>

				{/* Title */}
				<div className="absolute top-[10%] left-1/2 transform -translate-x-1/2">
					<h2
						className="font-semibold text-accent font-serif mb-1"
						style={{ fontSize: "clamp(0.4166rem, 2.5vw, 2.5rem)" }}
					>
						MIT
					</h2>
				</div>

				{/* Subtitle */}
				<div className="absolute top-[16%] left-1/2 transform -translate-x-1/2">
					<h1
						className="font-bold font-serif text-accent whitespace-nowrap"
						style={{ fontSize: "clamp(1rem, 6vw, 6rem)" }}
					>
						Asian American Association
					</h1>
				</div>
			</div>
		</section>
	);
}
