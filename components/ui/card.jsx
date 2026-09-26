import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {string} [class]
 * @property {string} [major]
 * @property {string} [involved_in]
 * @property {string} [fav_memory]
 * @property {string} [photo]
 * @property {string} [photo_position]
 * @property {number} [photo_scale]
 */

/**
 * @typedef {Object} ExecCardProps
 * @property {string} position
 * @property {string} photo
 * @property {Person[]} people
 * @property {string} [className]
 */

function Card({ className, ...props }) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full",
				className,
			)}
			{...props}
		/>
	);
}

function CardWithImage({ imageSrc, imageAlt, children, className, ...props }) {
	return (
		<div
			data-slot="card-with-image"
			className={cn(
				"bg-background text-card-foreground rounded-xl border-4 border-accent shadow-sm hover:shadow-lg transition-all duration-300 h-full",
				className,
			)}
			{...props}
		>
			<div className="flex items-start gap-6 p-6 h-full">
				<div className="w-1/3 rounded-lg overflow-hidden bg-muted flex-shrink-0">
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-full h-auto object-cover object-center border-5 border-yellow"
					/>
				</div>
				<div className="flex-1 flex flex-col gap-4 h-full">{children}</div>
			</div>
		</div>
	);
}

/**
 * @param {ExecCardProps} props
 */
function ExecCard({ position, photo, people, className, ...props }) {
	const hasLargeTeam = people.length > 2;

	return (
		<div className={cn("mx-auto", className)} {...props}>
			<div className="bg-background text-card-foreground rounded-xl border-2 border-accent transition-all duration-300">
				<div className="flex items-stretch gap-4 p-4">
					{/* Image container drives height */}
					<div className="w-1/3 rounded-lg overflow-hidden bg-muted flex-shrink-0">
						<img
							src={photo}
							alt={position}
							className="w-full h-auto object-contain border-5 border-yellow"
						/>
					</div>

					{/* Right side matches image height */}
					<div className="flex-1 flex flex-col h-full min-w-0">
						<h2
							className="font-bold text-accent mb-3"
							style={{
								fontSize: hasLargeTeam
									? "clamp(0.25rem, 1.1vw, 1.2rem)"
									: "clamp(0.3rem, 1.5vw, 1.5vw)",
							}}
						>
							{position}
						</h2>

						<div
							className={cn(
								"grid gap-4 flex-1",
								people.length <= 2 && "grid-cols-1",
								people.length === 3 && "grid-cols-3",
								people.length === 4 && "grid-cols-2",
							)}
						>
							{people.map(
								({ name, class: year, major, involved_in, fav_memory }) => (
									<div
										key={name}
										className="flex flex-col justify-between h-full"
									>
										<div className="flex flex-col gap-1 h-full">
											<h3
												className="font-bold text-black"
												style={{
												fontSize: hasLargeTeam
													? "clamp(0.18rem, 0.95vw, 1.1rem)"
													: "clamp(0.26rem, 1.25vw, 1.25vw)",
											}}
										>
											{name}
											{year ? ` ('${year})` : ""}
											</h3>
											{major && (
												<p
													className="text-accent font-serif font-bold leading-tight"
													style={{
												fontSize: hasLargeTeam
													? "clamp(0.16rem, 0.85vw, 1rem)"
													: "clamp(0.22rem, 1.05vw, 1.05vw)",
													}}
												>
													{major} | {involved_in}
												</p>
											)}
											{fav_memory && (
												<p
													className="text-black font-serif text-justify leading-tight flex-1"
													style={{
												fontSize: hasLargeTeam
													? "clamp(0.16rem, 0.85vw, 1rem)"
													: "clamp(0.22rem, 1.05vw, 1.05vw)",
													}}
												>
													<b>Favorite Memory:</b>{" "}
													<i>&ldquo;{fav_memory}&rdquo;</i>
												</p>
											)}
										</div>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * @param {{ person: Person, position?: string, className?: string, nameFontSize?: number, nameSlotRef?: React.Ref<HTMLHeadingElement> }} props
 */
function ExecProfileCard({
	person,
	position,
	className,
	nameFontSize = 20,
	nameSlotRef,
}) {
	const {
		name,
		class: year,
		major,
		involved_in,
		fav_memory,
		photo,
		photo_position,
		photo_scale,
	} = person;
	const initials = name
		.replace(/\s+\([^)]*\)/g, "")
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<article
			className={cn(
				"group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
				className,
			)}
		>
			<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-accent/20 via-yellow/30 to-muted">
				{photo ? (
					<Image
						src={photo}
						alt={`${name} headshot`}
						fill
						quality={90}
						sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
						className="h-full w-full object-cover transition-transform duration-500"
						style={{
							objectPosition: photo_position ?? "center",
							transform: `scale(${photo_scale ?? 1})`,
						}}
					/>
				) : (
					<div
						className="flex h-full w-full items-center justify-center text-5xl font-bold text-accent/80"
						aria-label={`Photo coming soon for ${name}`}
					>
						{initials}
					</div>
				)}
				{position && (
					<span className="absolute bottom-3 left-3 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-accent shadow-sm backdrop-blur-sm">
						{position}
					</span>
				)}
			</div>

			<div className="flex flex-1 flex-col gap-3 p-4">
				<div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2">
					<h3
						ref={nameSlotRef}
						className="min-w-0 whitespace-nowrap font-bold leading-none text-foreground"
						style={{ fontSize: `${nameFontSize}px` }}
					>
						{name}
					</h3>
					<span className="shrink-0 whitespace-nowrap rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
						{year ? `Class of 20${year}` : "Class TBD"}
					</span>
				</div>

				<p className="min-h-10 font-serif font-bold leading-snug text-accent">
					{major || "Major coming soon"}
				</p>

				<div className="min-h-[4.5rem]">
					<p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
						Also involved in
					</p>
					<p className="mt-1 text-sm leading-relaxed text-foreground">
						{involved_in || "Coming soon"}
					</p>
				</div>

				<div className="mt-auto border-t border-border pt-3">
					<p className="text-xs font-bold uppercase tracking-wider text-accent">
						Favorite AAA Memory
					</p>
					<blockquote className="mt-1.5 min-h-10 font-serif text-sm italic leading-relaxed text-muted-foreground">
						{fav_memory ? (
							<>&ldquo;{fav_memory}&rdquo;</>
						) : (
							"Coming soon"
						)}
					</blockquote>
				</div>
			</div>
		</article>
	);
}

function CardHeader({ className, ...props }) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardWithImage,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	ExecCard,
	ExecProfileCard,
};
