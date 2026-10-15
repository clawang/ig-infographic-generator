let prefixes = [
  "so you want to talk about",
  "what you can do about",
  "5 ways to help the situation with",
  "why aren't more people talking about",
  "why you should be more concerned about",
  "the problem with",
  "the trouble with",
  "why you should be worried about",
];

let pairs = [
  ["7 misconceptions about", "and why they're harmful"],
  ["how to stop", "and why you should"],
  ["let's talk about", "and what the issue is"],
  ["three reasons why", "should make you worried"],
  ["why", "should concern you"],
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
    [
      "and why it's worse than you think",
      "and why they're worse than you think",
    ],
    ["and what you can do about it", "and what you can do about them"],
    ["and why it needs to stop", "and why they need to be stopped"],
    ["and how you can help", "and how you can help"],
    ["and why you should care about it", "and why you should worry about them"],
    ["and what to do about it", "and what to do about them"],
  ],
};

let middle = {
  0: [
    "here's why % is problematic",
    "what % is and why you should care about it",
    "% needs to be stopped",
    "% is perpetuating white supremacy",
    "% is worse than you think",
    "% is upholding the patriarchy",
    "how % is silencing victims of oppression",
    "how % is an example of toxic masculinity",
    "here's how % is ruining society",
  ],
  1: [
    "here's why * are problematic",
    "what * are and why you should care about them",
    "* need to be stopped",
    "* are perpetuating white supremacy",
    "* are upholding the patriarchy",
    "* are worse than you think",
    "how * are silencing victims of oppression",
    "here's how * are ruining society",
    "how * are an example of toxic masculinity",
  ],
};

let content = {
  0: [
    "slam poetry",
    "being chronically online",
    "kony 2012",
    "getting the ick",
    "yassification",
    "being cringe",
    "the duolingo owl",
    "paying 8 dollars for a latte",
    "having a medium ugly boyfriend",
    "the word cheugy",
    "having no bitches",
    "getting ratioed",
    "being from New Jersey",
    "Kidz Bop",
    "losing the game",
    "Animal Crossing",
    "calling things 'camp' when they're really just bad",
    "Newton's first law of motion",
    "the secular hijab-inspired accessory",
    "the Issey Miyake montessori kindergarten",
    "Clavicular getting frame-mogged at an ASU frat party",
    "Gnarly by KATSEYE",
    "bringing iced coffee to an interview",
    "B2B SAAS",
    "the Beli app",
    "HYROX",
    "starting a Substack",
    "calling everything 'whimsy'",
    "being in a Chinese time of your life",
    "the $15,000 animatronic bird",
  ],
  1: [
    "nepo babies",
    "tik tok street interviewers",
    "white men with podcasts",
    "disney adults",
    "BTS stans",
    "ipad babies",
    "linkedinfluencers",
    "horse girls",
    "people who have a playlist named 'vibes'",
    "the remaining three try guys",
    "run clubs",
    "Partiful invites",
    "pickleball leagues",
  ],
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
  ["#ffe84c", "#000000"],
];

const fontPairings = [
  ["Maison Neue", "Gopher", "uppercase", "lowercase"],
  ["Montserrat", "Bebas Neue", "lowercase", "lowercase"],
  ["Brandon Grotesque", "Brandon Grotesque Bold", "lowercase", "uppercase"],
  ["Manrope-SemiBold", "Manrope-ExtraBold", "lowercase", "uppercase"],
  ["Ivy Mode", "Eksell Display", "lowercase", "uppercase"],
  ["Anonymous Pro", "Futura", "uppercase", "lowercase"],
  ["Neue Haas", "Bodoni", "lowercase", "uppercase"],
];

const fonts = [
  {
    name: "Anonymous Pro",
    src: "url('./media/AnonymousPro-Regular.ttf')",
  },
  {
    name: "Bebas Neue",
    src: "url('./media/BebasNeue-Regular.ttf')",
  },
  {
    name: "Bodoni",
    src: "url('./media/Bodoni.ttf')",
  },
  {
    name: "Brandon Grotesque",
    src: "url('./media/Brandon_reg.otf')",
  },
  {
    name: "Brandon Grotesque Bold",
    src: "url('./media/Brandon_blk.otf')",
  },
  {
    name: "Eksell Display",
    src: "url('./media/Eksell-Display-Medium.otf')",
  },
  {
    name: "Gopher",
    src: "url('./media/Gopher-Regular.ttf')",
  },
  {
    name: "Ivy Mode",
    src: "url('./media/IvyMode-Regular.ttf')",
  },
  {
    name: "Maison Neue",
    src: "url('./media/MaisonNeue-Book.ttf')",
  },
  {
    name: "Manrope-ExtraBold",
    src: "url('./media/Manrope-ExtraBold.ttf')",
  },
  {
    name: "Manrope-SemiBold",
    src: "url('./media/Manrope-SemiBold.ttf')",
  },
  {
    name: "Montserrat",
    src: "url('./media/montserrat-regular.ttf')",
  },
  {
    name: "Neue Haas",
    src: "url('./media/NeueHaasGrotesk.ttf')",
  },
];

export {
  prefixes,
  fillInTheblank,
  pairs,
  middle,
  content,
  colorPalettes,
  fontPairings,
  fonts,
};
