let prefixes = [
	"so you want to talk about", 
	"what to do about",
	"5 ways to help the situation with",
	"why aren't more people talking about",
	"why you should be more concerned about",
	"the problem with",
	"the trouble with",
	"why you should be worried about"
];

let pairs = [
	["7 misconceptions about", "and why they're harmful"],
	["how to stop", "and why you should"],
	["let's talk about", "and what the issue is"],
	["three reasons why", "should make you worried"],
	["why", "should concern you"]
];

let fillInTheblank = {
	0: [
		"what's happening with",
		"what's going on with",
		"what's wrong with",
		"the problem with",
		"the issue with",
		"everything going on with",
		"we need to talk about",
		"everything you should know about",
	],
	1: [
		"and why it's worse than you think",
		"and what you can do about it",
		"and why it needs to stop",
		"and how you can help",
		"and why you should care about it",
		"and what to do about it"
	]
};

let middle = [
	"here's why % is problematic",
	"what % is and why you should care about it",
	"% needs to be stopped",
	"here's why * are problematic",
	"what * are and why you should care about them",
	"* need to be stopped",
	"% is perpetuating white supremacy",
	"* are perpetuating white supremacy",
	"% is upholding the patriarchy",
	"* are upholding the patriarchy",
	"% is worse than you think",
	"* are worse than you think",
	"why % is silencing victims of oppression",
	"why * are silencing victims of oppression",
];

let content = {
	0: [
		"lena dunham's latest apology",
		"using australian accents for comedy",
		"the NY Times buying wordle",
		"the hinge audio feature",
		"the 2014 tumblr aesthetic",
		"soft-launching your significant other",
		"being josh safdie's muse",
		"dwayne the rock johnson rapping",
		"the metaverse",
		"slam poetry",
		"being chronically online",
		"kony 2012",
		"getting the ick",
		"yassification",
		"bimboification",
		"having a problematic fave",
		"hating The Office",
		"thanos's plan for the snap",
		"kim kardashian's diamond earring",
		"being horny on main",
		"being cringe",
		"being down astronomical",
		"the duolingo owl",
		"unironically saying the word 'adulting'",
		"paying 7 dollars for coffee",
		"having a medium ugly boyfriend",
		"having allergies",
		"being near-sighted",
		"handsome squidward",
		"the word cheugy",
		"hedwig the owl",
		"enslaving pokemon",
		"james corden",
		"having no bitches",
		"getting ratioed",
		"dalgona coffee",
		"applebee's",
		"harambe",
		"goblin mode",
		"having acrylic nails",
		"baymax from big hero 6",
		"calling your boss dad",
		"emily mariko's salmon rice"
	],
	1: [
		"nepotism babies",
		"tik tok street interviewers",
		"deep fried memes",
		"white men with podcasts",
		"millenials",
		"disney adults",
		"BTS stans",
		"crypto bros",
		"POV tik toks",
		"mullets",
		"influencers launching a music career",
		"small crusty white dogs",
		"short kings",
		"soundcloud rappers",
		"netflix teen romcoms",
		"adult theater kids",
		"ipad babies",
		"washed up viners",
		"the sokovia accords",
		"elevated basics"
	]
};

let colorPalettes = [
	["#e6ddda", "#000000"],
	["#efebe0", "#000000"],
	["#ffe1c5", "#000000"],
	["#445cbf", "#ffffff"],
	["#f3f3f3", "#aa3231"],
	["#edaa68", "#c64e28"],
	["#93d667", "#1b4224"],
	["#b8201a", "#ffffff"],
	["#ffc6cf", "#ee6a2a"],
	["#fff6db", "#218545"],
	["#ffe84c", "#000000"]
];

const fontPairings = [
	["Maison Neue", "Gopher", "uppercase", "lowercase"],
	["Montserrat", "Bebas Neue", "uppercase", "lowercase"],
	["Brandon Grotesque", "Brandon Grotesque Bold", "lowercase", "uppercase"],
	["Manrope-SemiBold", "Manrope-ExtraBold", "lowercase", "uppercase"],
	["Ivy Mode", "Eksell Display", "lowercase", "uppercase"],
	["Anonymous Pro", "Futura", "uppercase", "lowercase"],
	["Neue Haas", "Bodoni", "lowercase", "uppercase"]
];

const fonts = [
	{
		name: "Anonymous Pro",
		src: "url('./media/AnonymousPro-Regular.ttf')"
	},
	{
		name: "Bebas Neue",
		src: "url('./media/BebasNeue-Regular.ttf')"
	},
	{
		name: "Bodoni",
		src: "url('./media/Bodoni.ttf')"
	},
	{
		name: "Brandon Grotesque",
		src: "url('./media/Brandon_reg.otf')"
	},
	{
		name: "Brandon Grotesque Bold",
		src: "url('./media/Brandon_blk.otf')"
	},
	{
		name: "Eksell Display",
		src: "url('./media/Eksell-Display-Medium.otf')"
	},
	{
		name: "Gopher",
		src: "url('./media/Gopher-Regular.ttf')"
	},
	{
		name: "Ivy Mode",
		src: "url('./media/IvyMode-Regular.ttf')"
	},
	{
		name: "Maison Neue",
		src: "url('./media/MaisonNeue-Book.ttf')"
	},
	{
		name: "Manrope-ExtraBold",
		src: "url('./media/Manrope-ExtraBold.ttf')"
	},
	{
		name: "Manrope-SemiBold",
		src: "url('./media/Manrope-SemiBold.ttf')"
	},
	{
		name: "Montserrat",
		src: "url('./media/montserrat-regular.ttf')"
	},
	{
		name: "Neue Haas",
		src: "url('./media/NeueHaasGrotesk.ttf')"
	},
];

export {prefixes, fillInTheblank, pairs, middle, content, colorPalettes, fontPairings, fonts};