/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				ice: "#a0d2eb",
				freezePurple: "#e5eaf5",
				mediumPurple: "#d0bdf4",
				purplePlain: "#8458B3",
				heavyPurple: "#a28089",
			},
		},
	},
	plugins: [],
};
