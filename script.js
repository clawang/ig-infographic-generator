import {prefixes, fillInTheblank, pairs, middle, content, colorPalettes, fontPairings, fonts} from './variables.js';

const used = [{},{}];
let canvas = document.getElementById("downloadable");
const ctx = canvas.getContext('2d');

let width;
let height;

// set the number of canvas pixels, scaled for screen resolution
let pxScale = window.devicePixelRatio;

// use img from the DOM
const image = document.querySelector('img');
image.crossOrigin = "Anonymous";

const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

const loadFonts = async () => {
	fonts.forEach(async(font) => {
		const fontFile = new FontFace(font.name, font.src);
		await fontFile.load();
		document.fonts.add(fontFile);
	});
}

const setup = () => {
    // fixed canvas size
    width = canvas.width;
    height = canvas.height;

    if(window.innerWidth < 500) {
		width = window.innerWidth;
		height = window.innerWidth;
		canvas.width = width;
		canvas.height = height;
	}

    // set the CSS display size
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.width = width * pxScale;
    canvas.height = height * pxScale;

    // normalize the coordinate system
    ctx.scale(pxScale, pxScale);
}

const generateKeyword = (plural) => {
	const index = plural ? 1 : 0;
	if(Object.keys(used[index]).length === content[index].length) {
		used[index] = {};
	}
	let wordIndex, result;
	while(result === undefined || used[index].hasOwnProperty(result)) {
		wordIndex = getRandom(0, content[index].length);
		result = content[index][wordIndex];
	}
	used[index][result] = wordIndex;
	return result;
}

const getOption = (random) => {
	if(random < 40) return 1; //fill in the blank
	else if(random >= 40 && random < 70) return 2; //middle
	else if(random >= 70 && random < 90) return 0; //prefix
	else if(random >= 90) return 3; //paris
}

const getMessage = () => {
	let str = '';
	let prefixIndex, contentIndex, suffixIndex;
	let prefix, keyword, suffix;
	const random = getRandom(0, 100);
	const option = getOption(random);
	if(option === 0) {
		prefix = prefixes[getRandom(0, prefixes.length)];
		keyword = generateKeyword(getRandom(0, 2));
		//str = prefix + " " + content[contentIndex];
	} else if(option === 1) {
		prefix = fillInTheblank[0][getRandom(0, fillInTheblank[0].length)];
		suffix = fillInTheblank[1][getRandom(0, fillInTheblank[1].length)];
		keyword = generateKeyword(getRandom(0, 2));
		//str += blank1[prefixIndex] + " " + blank2[suffixIndex];
	} else if(option === 2) {
		let index = getRandom(0, middle.length);
		let replaceIndex = middle[index].indexOf('%');
		if(replaceIndex < 0) {
			replaceIndex = middle[index].indexOf('*');
			keyword = generateKeyword(1);
		} else {
			keyword = generateKeyword(0);
		}
		keyword = middle[index].substring(0, replaceIndex) + keyword;
		keyword += middle[index].substring(replaceIndex+1);
		//str = middle[index].substring(0, replaceIndex) + content[contentIndex] + middle[index].substring(replaceIndex+1);
	} else if(option === 3) {
		let index = getRandom(0, pairs.length);
		prefix = pairs[index][0];
		suffix = pairs[index][1];
		keyword = generateKeyword(getRandom(0, 2));
	}
	//console.log(str);
	return {option, prefix, keyword, suffix};
}

const getLines = (ctx, text, maxWidth) => {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

const drawCanvas = () => {
	const size = width;
	const ratio = size/500;

	/** Drawing background */
	const palette = colorPalettes[getRandom(0, colorPalettes.length)];
	ctx.fillStyle = palette[0];
	ctx.fillRect(0, 0, size, size);
	ctx.fillStyle = palette[1];
	ctx.textAlign = 'center';

	/** Picking font */
	const fonts = fontPairings[getRandom(0, fontPairings.length)];

	const msg = getMessage();

	if(msg.prefix) {
		let bigFontSize = 40 * ratio;
		if(fonts[1] === "Bebas Neue") bigFontSize *= 1.4;
		ctx.font = bigFontSize + "px " + fonts[1];
		const message = fonts[3] === "uppercase" ? msg.keyword.toUpperCase() : msg.keyword;
		const lines = getLines(ctx, message, size-40);
		let yStart = size/2 - lines.length * bigFontSize/2 - 10;
		ctx.textBaseline = "top";
		let smallFontSize = 24 * ratio;
		const topMargin = 8;
		const bottomMargin = 6;

		ctx.font = smallFontSize + "px " + fonts[0];
		let prefixLines, suffixLines;
		
		if(msg.prefix) {
			const prefix = fonts[2] === "uppercase" ? msg.prefix.toUpperCase() : msg.prefix;
			prefixLines = getLines(ctx, prefix, size-80);
		}

		if(msg.suffix) {
			const suffix = fonts[2] === "uppercase" ? msg.suffix.toUpperCase() : msg.suffix;
			suffixLines = getLines(ctx, suffix, size-80);
		}

		if(msg.option === 0) yStart += (smallFontSize * prefixLines.length)/2;

		ctx.font = bigFontSize + "px " + fonts[1];

		lines.forEach((l, i, arr) => {
			ctx.fillText(l, size/2, yStart + (bigFontSize * i));
		});

		ctx.font = smallFontSize + "px " + fonts[0];

		if(prefixLines) {
			prefixLines.forEach((l, i, arr) => {
				ctx.fillText(l, size/2, yStart - (arr.length*smallFontSize) + (smallFontSize * i) - topMargin);
			});
		}

		if(suffixLines) {
			suffixLines.forEach((l, i, arr) => {
				ctx.fillText(l, size/2, yStart + (bigFontSize*lines.length) + bottomMargin + (smallFontSize * i));
			});
		}
	} else {
		let fontSize = 40 * ratio;
		if(fonts[1] === "Bebas Neue") fontSize *= 1.5;
		ctx.font = fontSize + "px " + fonts[1];
		const message = fonts[3] === "uppercase" ? msg.keyword.toUpperCase() : msg.keyword;
		const lines = getLines(ctx, message, size-40);
		const yStart = size/2 - (lines.length * fontSize / 2);

		lines.forEach((l, i, arr) => {
			ctx.fillText(l, size/2, yStart + (fontSize * i));
		});
	}
}

const dlCanvas = () => {
	let canvas = document.getElementById("downloadable");
	let dt = canvas.toDataURL('image/png');
	/* Change MIME type to trick the browser to downlaod the file instead of displaying it */
	dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

	/* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
	dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
	var link = document.createElement('a');
	link.download = 'infographic.png';
	link.href = dt;
	link.click();
}

await loadFonts();
window.addEventListener('load', setup);
document.getElementById('button').addEventListener("click", drawCanvas);
document.getElementById('download').addEventListener("click", dlCanvas);
