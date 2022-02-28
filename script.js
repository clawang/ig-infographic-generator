import {prefixes, fillInTheblank, pairs, middle, content, colorPalettes, fontPairings} from './variables.js';

const used = [{},{}];

const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
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


const size = 500;

const drawCanvas = () => {
	let c = document.getElementById("downloadable");
	c.width = c.clientWidth * 2
	c.height = c.clientHeight * 2
	let ctx = c.getContext("2d");
	if(window.innerWidth < 600) {
		ctx.scale(1.4, 1.4);
	} else {
		ctx.scale(2, 2);
	}

	// const bgIndex = getRandom(1, 4);
	// let bg = document.getElementById("bg"+bgIndex);
	// ctx.drawImage(bg, 0, 0, size, size);

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
		let bigFontSize = 35;
		if(fonts[1] === "Bebas Neue") bigFontSize *= 1.4;
		ctx.font = bigFontSize + "px " + fonts[1];
		const message = fonts[3] === "uppercase" ? msg.keyword.toUpperCase() : msg.keyword;
		const lines = getLines(ctx, message, size-40);
		let yStart = size/2 - lines.length * bigFontSize/2 - 20;
		ctx.textBaseline = "top";
		let smallFontSize = 20;
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

		if(msg.option === 0) yStart += (smallFontSize * prefixLines.length + bigFontSize * lines.length - 10)/2;

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
		let fontSize = 35;
		if(fonts[1] === "Bebas Neue") fontSize *= 1.5;
		ctx.font = fontSize + "px " + fonts[1];
		const message = fonts[3] === "uppercase" ? msg.keyword.toUpperCase() : msg.keyword;
		const lines = getLines(ctx, message, size-40);
		const yStart = size/2 - lines.length * 15;

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

document.getElementById('button').addEventListener("click", drawCanvas);
document.getElementById('download').addEventListener("click", dlCanvas);