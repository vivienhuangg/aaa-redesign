import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {string} class
 * @property {string} [major]
 * @property {string} [involved_in]
 * @property {string} [fav_memory]
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
	return (
		<div className={cn("mx-auto", className)} {...props}>
			<div className="bg-background text-card-foreground rounded-xl border-2 border-accent transition-all duration-300">
				<div className="flex items-stretch gap-4 p-4">
					{/* Image container drives height */}
					<div
						className={cn(
							"rounded-lg overflow-hidden bg-muted flex-shrink-0",
							position === "Spring Reps" ? "w-1/2" : "w-1/3",
						)}
					>
						<img
							src={photo}
							alt={position}
							className="w-full h-auto object-contain border-5 border-yellow"
						/>
					</div>

					{/* Right side matches image height */}
					<div className="flex-1 flex flex-col h-full min-w-0">
						<h2
							className="font-bold text-accent mb-2"
							style={{
								fontSize:
									// position === "Spring Reps"
									// 	? "clamp(0.25rem, 1.1vw, 1.2rem)"
									"clamp(0.3rem, 1.5vw, 1.5vw)",
							}}
						>
							{position}
						</h2>

						<div
							className={cn(
								"grid gap-4 flex-1",
								people.length === 2 ? "grid-rows-2" : "grid-rows-1",
								people.length > 2 ? "gap-2" : "",
							)}
						>
							{people.map(
								({ name, class: year, major, involved_in, fav_memory }) => (
									<div
										className={cn(
											"flex flex-col gap-2 h-full",
											people.length > 2 ? "gap-0" : "",
										)}
									>
										<h3
											className="font-bold text-black"
											style={{
												fontSize:
													// position === "Spring Reps"
													// 	? "clamp(0.18rem, 0.95vw, 1.1rem)"
													"clamp(0.26rem, 1.25vw, 1.25vw)",
											}}
										>
											{name} (&apos;{year})
										</h3>
										{major && (
											<p
												className="text-accent font-serif font-bold leading-tight"
												style={{
													fontSize:
														// position === "Spring Reps"
														// 	? "clamp(0.16rem, 0.85vw, 1rem)"
														"clamp(0.22rem, 1.05vw, 1.05vw)",
												}}
											>
												{major} | {involved_in}
											</p>
										)}
										{fav_memory && (
											<p
												className="text-black font-serif text-justify leading-tight flex-1"
												style={{
													fontSize:
														// position === "Spring Reps"
														// 	? "clamp(0.16rem, 0.85vw, 1rem)"
														"clamp(0.22rem, 1.05vw, 1.05vw)",
												}}
											>
												<b>Favorite Memory:</b>{" "}
												<i>&ldquo;{fav_memory}&rdquo;</i>
											</p>
										)}
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
};
