import {prefixes, fillInTheblank, pairs, middle, content, colorPalettes, fontPairings, fonts} from './variables.js';

const used = [{},{}];
var canvas = document.getElementById("downloadable");
const ctx = canvas.getContext('2d');

var width;
var height;

// set the number of canvas pixels, scaled for screen resolution
var pxScale = window.devicePixelRatio;

// use img from the DOM
const image = document.querySelector('img');
image.crossOrigin = "Anonymous";

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

async function loadFonts() {
	fonts.forEach(async(font) => {
		const fontFile = new FontFace(font.name, font.src);
		await fontFile.load();
		document.fonts.add(fontFile);
	});
}

function setup() {
	(async () => {
        await loadFonts()
    })()

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

function generateKeyword(plural) {
	const index = plural ? 1 : 0;
	if(Object.keys(used[index]).length === content[index].length) {
		used[index] = {};
	}
	var wordIndex, result;
	while(result === undefined || used[index].hasOwnProperty(result)) {
		wordIndex = getRandom(0, content[index].length);
		result = content[index][wordIndex];
	}
	used[index][result] = wordIndex;
	return result;
}

function getOption(random) {
	if(random < 40) return 1; //fill in the blank
	else if(random >= 40 && random < 70) return 2; //middle
	else if(random >= 70 && random < 90) return 0; //prefix
	else if(random >= 90) return 3; //paris
}

function getMessage() {
	var str = '';
	var prefixIndex, contentIndex, suffixIndex;
	var prefix, keyword, suffix;
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
		var index = getRandom(0, middle.length);
		var replaceIndex = middle[index].indexOf('%');
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
		var index = getRandom(0, pairs.length);
		prefix = pairs[index][0];
		suffix = pairs[index][1];
		keyword = generateKeyword(getRandom(0, 2));
	}
	//console.log(str);
	return {option, prefix, keyword, suffix};
}

function getLines(ctx, text, maxWidth) {
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

function getLineHeight(text) {
	const textMetrics = ctx.mesureText(text);

}

function drawCanvas() {
	const size = width;
	const ratio = size/500;

	/** Drawing background */
	const pavarte = colorPalettes[getRandom(0, colorPalettes.length)];
	ctx.fillStyle = pavarte[0];
	ctx.fillRect(0, 0, size, size);
	ctx.fillStyle = pavarte[1];
	ctx.textAlign = 'center';

	/** Picking font */
	const fonts = fontPairings[getRandom(0, fontPairings.length)];

	const msg = getMessage();

	if(msg.prefix) {
		var bigFontSize = 40 * ratio;
		if(fonts[1] === "Bebas Neue") bigFontSize *= 1.4;
		ctx.font = bigFontSize + "px " + fonts[1];
		const message = fonts[3] === "uppercase" ? msg.keyword.toUpperCase() : msg.keyword;
		const lines = getLines(ctx, message, size-40);
		var yStart = size/2 - lines.length * bigFontSize/2 - 10;
		ctx.textBaseline = "top";
		var smallFontSize = 24 * ratio;
		var topMargin = 15;
		var bottomMargin = 12;

		ctx.font = smallFontSize + "px " + fonts[0];
		var prefixLines, suffixLines;
		
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
		if(fonts[1] === 'Gopher' || fonts[1] === 'Futura') {
			bottomMargin += 8;
		}

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
		var fontSize = 40 * ratio;
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

function dlCanvas() {
	var canvas = document.getElementById("downloadable");
	var dt = canvas.toDataURL('image/png');
	/* Change MIME type to trick the browser to downlaod the file instead of displaying it */
	dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

	/* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
	dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
	var link = document.createElement('a');
	link.download = 'infographic.png';
	link.href = dt;
	link.click();
}

window.addEventListener('load', setup);
document.getElementById('button').addEventListener("click", drawCanvas);
document.getElementById('download').addEventListener("click", dlCanvas);
