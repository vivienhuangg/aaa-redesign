"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import { ExecProfileCard } from "@/components/ui/card";

const NAME_FONT_MAX = 20;
const NAME_FONT_MIN = 13;

function useSharedNameFontSize(names) {
	const nameSlotRef = useRef(null);
	const [fontSize, setFontSize] = useState(NAME_FONT_MAX);
	const namesKey = names.join("|");

	useLayoutEffect(() => {
		const slot = nameSlotRef.current;
		if (!slot) return;

		const allNames = namesKey.split("|");
		const { fontFamily, fontWeight } = getComputedStyle(slot);

		const measure = () => {
			const width = slot.clientWidth;
			if (width <= 0) return;

			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");
			if (!context) return;

			const fits = (size) => {
				context.font = `${fontWeight} ${size}px ${fontFamily}`;
				return allNames.every(
					(name) => context.measureText(name).width <= width - 2,
				);
			};

			let low = NAME_FONT_MIN;
			let high = NAME_FONT_MAX;
			let best = NAME_FONT_MIN;

			while (high - low > 0.15) {
				const mid = (low + high) / 2;
				if (fits(mid)) {
					best = mid;
					low = mid;
				} else {
					high = mid;
				}
			}

			setFontSize(Math.round(best * 10) / 10);
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(slot);
		return () => observer.disconnect();
	}, [namesKey]);

	return { nameSlotRef, fontSize };
}

const profiles = {
	"Alicia Ji": {
		class: "27",
		photo: "/images/exec/alicia_ji.jpg",
		major: "Artificial Intelligence and Decision Making (6-4)",
		involved_in: "Sigma Kappa, MINCE, Baker Foundation",
		fav_memory: "Organizing & cooking for our annual Grains of Rice event!!",
	},
	"Gyeongwu Kim (GK)": {
		class: "27",
		photo: "/images/exec/gyeongwu_kim.jpg",
		major: "Computer Science and Engineering (6-3)",
		involved_in: "Football, Phi Beta Epsilon",
		fav_memory: "Nightmaaarket",
	},
	"Audrey Oh": {
		class: "27",
		photo: "/images/exec/audrey_oh.jpg",
		photo_position: "50% 62%",
		photo_scale: 1.35,
		major: "Computer Science, Economics, and Data Science (6-14) & Finance (15-3)",
		involved_in: "Women's Field Hockey, UROP, Theta, MISTI GTL",
		fav_memory:
			"Post-Grains of Rice Berryline :P",
	},
	"Caiden Lung": {
		class: "28",
		photo: "/images/exec/caiden_lung.JPG",
		photo_position: "50% 50%",
		photo_scale: 1.3,
		major: "Computer Science and Engineering (6-3)",
		involved_in: "Men's Lacrosse, Phi Beta Epsilon",
		fav_memory: "Kaaaroake internal bonding with exec",
	},
	"Andy Zhang": {
		class: "27",
		photo: "/images/exec/andy_zhang.JPG",
		major: "Computer Science and Engineering (6-3) & Mathematics (18)",
		involved_in: "Men's Fencing, Phi Delta Theta",
		fav_memory: "Celebrating after Grains of Rice",
	},
	"Zachary Starr": {
		class: "28",
		photo: "/images/exec/zachary_starr.jpeg",
		major: "Artificial Intelligence and Decision Making (6-4)",
		involved_in: "Men's Squash, Sigma Chi",
		fav_memory: "Secret SAAAnta",
	},
	"Rayna Li": {
		class: "29",
		photo: "/images/exec/rayna_li.JPG",
		major: "Computer Science, Economics, and Data Science (6-14) & Finance (15-3)",
		involved_in: "Women's Varsity Tennis, Sigma Kappa Sorority",
		fav_memory: "Kaaaraoke internal bonding with exec",
	},
	"Rebecca Xiong": {
		class: "28",
		photo: "/images/exec/rebecca_xiong.JPG",
		major: "Computer Science and Engineering (6-3)",
		involved_in: "Theta",
		fav_memory: "Cooking and MCing for Grains of Rice!",
	},
	"Juliana Chinzorig": {
		class: "29",
		photo: "/images/exec/juliana_chinzorig.jpg",
		photo_position: "72% 28%",
		major: "Design (4B) & Artificial Intelligence and Decision Making (6-4)",
		involved_in: "UROP, Mongolian Students Association",
		fav_memory: "Retreaaat kayaking and bonding :)",
	},
	"Bryan Chyu": {
		class: "29",
		photo: "/images/exec/bryan_chyu.jpg",
		photo_position: "38% 28%",
		major: "Engineering (2-A)",
		involved_in: "Phi Delta Theta",
		fav_memory: "Making s'mores at retreaaat",
	},
	"Sarah Pan": {
		class: "28",
		photo: "/images/exec/sarah_pan.jpg",
		major: "Artificial Intelligence and Decision Making (6-4) & Mathematics (18)",
		involved_in: "Kappa Alpha Theta, Women's Crew",
		fav_memory: "Retreat",
	},
	"Anthony Koh": {
		class: "28",
		photo: "/images/exec/anthony_koh.JPG",
		major: "Civil and Environmental Engineering (1)",
		involved_in: "Men's Swimming & Diving, Club Golf, MIT Wind Ensemble",
		fav_memory: "Cooking and prepping for our annual Grains of Rice banquet.",
	},
	"Shaunak Joshi": {
		class: "27",
		photo: "/images/exec/shaunak_joshi.jpg",
		major: "Computer Science and Engineering (6-3)",
		involved_in: "Men's Varsity Football, Phi Beta Epsilon",
		fav_memory: "Cooking for Grains of Rice this spring",
	},
	"Alex Han": {
		class: "27",
		photo: "/images/exec/alex_han.JPG",
		major: "Biological Engineering (20)",
		involved_in: "Wellbeing Ambassador, UROP, SK, MISTI GTL",
		fav_memory:
			"Meet the Exec bingo event!",
	},
	"Warren Nam": {
		class: "28",
		photo: "/images/exec/warren_nam.JPG",
		major: "Artificial Intelligence and Decision Making (6-4) & Physics (8-Flex)",
		involved_in: "Sigma Chi, Men's Volleyball",
		fav_memory: "Grains of Rice",
	},
	"Lauren Won": {
		class: "29",
		photo: "/images/exec/lauren_won.JPG",
		major: "Materials Science and Engineering (3)",
		involved_in:
			"Women's Soccer, Kappa Alpha Theta, Ring Committee, Admissions Blogger",
		fav_memory: "Retreaaat!",
	},
	"Preston Dinh": {
		class: "29",
		photo: "/images/exec/preston_row.jpg",
		major: "Computer Science and Engineering (6-3)",
		involved_in: "Men's Football",
		fav_memory: "Bonding with exec at retreat",
	},
	"Jennifer Cen": {
		class: "28",
		photo: "/images/exec/jen_cen.JPG",
		major: "Computer Science, Economics, and Data Science (6-14)",
		involved_in:
			"Women's Varsity Volleyball, Kappa Alpha Theta, Little Beavers",
		fav_memory: "Hanging out by the lake at retreAAAt!",
	},
	"Davin Huynh": {
		class: "29",
		photo: "/images/exec/davin_huynh.png",
		major: "Computer Science and Molecular Biology (6-7)",
		involved_in: "MIT Chess, MIT Biotech Group, MISTI GTL, Phi Kappa Theta",
		fav_memory: "Rooftop socials and karaoke internal bonding with exec",
	},
	"Chloe Dai": {
		class: "29",
		photo: "/images/exec/chloe_dai.JPG",
		major: "Computation and Cognition (6-9)",
		involved_in:
			"Women's soccer, Alpha Phi, MIT x Harvard Women in AI, Little Beavers",
		fav_memory: "RetreAAAt!",
	},
};

function person(name: string) {
	return { name, ...(profiles[name as keyof typeof profiles] ?? {}) };
}

const execBoard = [
	{
		position: "Presidents",
		people: [person("Alicia Ji"), person("Gyeongwu Kim (GK)")],
	},
	{
		position: "Vice President",
		people: [person("Audrey Oh")],
	},
	{
		position: "Treasurer",
		people: [person("Andy Zhang")],
	},
	{
		position: "Secretary",
		people: [person("Caiden Lung")],
	},
	{
		position: "Internal Social",
		people: [person("Zachary Starr"), person("Rayna Li")],
	},
	{
		position: "Publicity",
		people: [person("Rebecca Xiong"), person("Juliana Chinzorig")],
	},
	{
		position: "External Lead",
		people: [person("Bryan Chyu")],
	},
	{
		position: "External Team",
		people: [
			person("Sarah Pan"),
			person("Shaunak Joshi"),
			person("Lauren Won"),
		],
	},
	{
		position: "Events Lead",
		people: [person("Anthony Koh")],
	},
	{
		position: "Events Team",
		people: [person("Alex Han"), person("Warren Nam"), person("Preston Dinh")],
	},
	{
		position: "Srep",
		people: [person("Jennifer Cen"), person("Chloe Dai"), person("Davin Huynh")],
	},
];

const execMembers = execBoard.flatMap((group) =>
	group.people.map((member) => ({ ...member, position: group.position })),
);

export default function ExecPage() {
	const memberNames = useMemo(
		() => execMembers.map((member) => member.name),
		[],
	);
	const { nameSlotRef, fontSize } = useSharedNameFontSize(memberNames);

	return (
		<div className="bg-background py-20 relative overflow-hidden">
			<NavBar />
			<div className="container mx-auto px-4 sm:px-6">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
						meet the exec!
					</h1>
					<p className="font-serif text-lg text-muted-foreground">
						Meet the people behind AAA&apos;s events, community, and culture.
					</p>
				</div>

				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{execMembers.map((member, index) => (
						<ExecProfileCard
							key={member.name}
							person={member}
							position={member.position}
							nameFontSize={fontSize}
							nameSlotRef={index === 0 ? nameSlotRef : undefined}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
