"use client";

import NavBar from "@/components/NavBar/NavBar";
import { ExecCard } from "@/components/ui/card";

export default function ExecPage() {
	const execBoard = [
		{
			position: "Presidents",
			photo: "/images/president.jpg",
			people: [
				{
					name: "Justin Lee",
					class: "26",
					major: "Architecture (4)",
					involved_in: "Phi Beta Epsilon, Little Beavers",
					fav_memory: "MC'ing Grains of Rice freshman year",
				},
				{
					name: "Kelly Kim",
					class: "26",
					major: "Management (15-1) & Literature (21L)",
					involved_in:
						"UA Student Support and Wellness Committee, Wellbeing Lab Assistant, Peer Career Advisor ",
					fav_memory:
						"finding out my fAAAmline at our 2024 exec retreAAAt! :) ",
				},
			],
		},
		{
			position: "Vice President",
			photo: "/images/vice-president.jpg",
			people: [
				{
					name: "Vivien Huang",
					class: "26",
					major: "Computer Science, Economics, and Data Science (6-14)",
					involved_in: "Panhellenic Council",
					fav_memory:
						"Getting surprised for my birthday at Grains of Rice postgame :)",
				},
			],
		},
		{
			position: "Secretary",
			photo: "/images/secretary.jpg",
			people: [
				{
					name: "Stephen Shin",
					class: "26",
					major:
						"Artificial Intelligence and Decision Making (6-4) & Mathematics (18)",
					involved_in: "Men's Squash, Phi Delta Theta",
					fav_memory:
						"Jumping into the Atlantic Ocean during RetreAAAt in January with Zach and Patty",
				},
			],
		},
		{
			position: "Treasurer",
			photo: "/images/treasurer.jpg",
			people: [
				{
					name: "Eunice Choi",
					class: "26",
					major: "",
					involved_in: "",
					fav_memory: "",
				},
			],
		},
		{
			position: "Events",
			photo: "/images/events.jpg",
			people: [
				{
					name: "Zachary Starr",
					class: "28",
					major: "",
					involved_in: "",
					fav_memory: "",
				},
				{
					name: "Alicia Ji",
					class: "27",
					major: "Artificial Intelligence and Decision Making (6-4)",
					involved_in: "Sigma Kappa, MINCE",
					fav_memory:
						"Organizing & cooking for our annual Grains of Rice event!!",
				},
			],
		},
		{
			position: "Internal Social",
			photo: "/images/internal-social.jpg",
			people: [
				{
					name: "Gyeongwu Kim",
					class: "27",
					major: "Computer Science and Engineering (6-3)",
					involved_in: "Men's Varsity Football, Phi Beta Epsilon",
					fav_memory: "Nightmaaarket",
				},
				{
					name: "Alex Han",
					class: "27",
					major: "Biological Engineering (20)",
					involved_in: "Wellbeing Ambassador, UROP, SK, MISTI GTL",
					fav_memory:
						"My freshman fall before I joined Exec, Exec held a Meet the Exec Members Bingo event. Still remember meeting so many wonderful people for the first time there. ",
				},
			],
		},
		{
			position: "Publicity",
			photo: "/images/publicity.jpg",
			people: [
				{
					name: "Audrey Oh",
					class: "27",
					major: "",
					involved_in: "",
					fav_memory: "",
				},
				{
					name: "Ashley Huang",
					class: "28",
					major: "Artificial Intelligence and Decision Making (6-4)",
					involved_in: "Sigma Kappa",
					fav_memory: "skaaate",
				},
			],
		},
		{
			position: "External Social",
			photo: "/images/external-social.jpg",
			people: [
				{
					name: "Sophia Chen",
					class: "26",
					major: "",
					involved_in: "",
					fav_memory: "",
				},
			],
		},
		{
			position: "External Relations",
			photo: "/images/external-relations.jpg",
			people: [
				{
					name: "Sarah Pan",
					class: "28",
					major:
						"Artificial Intelligence and Decision Making (6-4) & Mathematics (18)",
					involved_in: "Kappa Alpha Theta, Women's Crew",
					fav_memory: "Retreat",
				},
			],
		},
		{
			position: "Philanthropy",
			photo: "/images/philanthropy.jpg",
			people: [
				{
					name: "Caiden Lung",
					class: "28",
					major: "Computer Science and Engineering (6-3)",
					involved_in: "Men's Lacrosse, Phi Beta Epsilon",
					fav_memory: "Kaaaroake internal bonding with exec",
				},
			],
		},
		{
			position: "Member Outreach",
			photo: "/images/member-outreach.jpg",
			people: [
				{
					name: "Hyunsu Price",
					class: "26",
					major: "",
					involved_in: "",
					fav_memory: "",
				},
			],
		},
		{
			position: "Spring Reps",
			photo: "/images/spring-reps.jpg",
			people: [
				{
					name: "Anthony Koh",
					class: "28",
					major: "Civil and Environmental Engineering (1)",
					involved_in: "Men's Swimming & Diving, Club Golf, MIT Wind Ensemble",
					fav_memory:
						"Cooking and prepping for our annual Grains of Rice banquet.",
				},
				{
					name: "Andy Zhang",
					class: "27",
					major: "Computer Science and Engineering (6-3) & Mathematics (18)",
					involved_in: "Men's Fencing, Phi Delta Theta",
					fav_memory: "Celebrating after Grains of Rice",
				},

				{
					name: "Warren Nam",
					class: "28",
					major:
						"Artificial Intelligence and Decision Making (6-4), Physics (8 Flex)",
					involved_in: "Sigma Chi, Men's Volleyball",
					fav_memory: "Grains of Rice, surely this year I'll go to retreat",
				},
				{
					name: "Shaunuk Joshi",
					class: "27",
					major: "Computer Science and Engineering (6-3)",
					involved_in: "Men's Varsity Football, Phi Beta Epsilon",
					fav_memory: "Cooking for Grains of Rice this spring",
				},

				{
					name: "Rebecca Xiong",
					class: "28",
					major: "",
					involved_in: "",
					fav_memory: "",
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-background py-20 relative overflow-hidden">
			<NavBar />
			<div className="container mx-auto px-2">
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
						meet the exec!
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-8">
					{execBoard.map((position) => (
						<ExecCard
							className="bg-white border-border"
							key={position.position}
							position={position.position}
							photo={position.photo}
							people={position.people}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
