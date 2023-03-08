const fs = require('fs');

const { createCanvas, loadImage } = require('canvas');

class Postcards {
	constructor(postcards) {
		this.postcards = postcards;
	}

	getPostcardsFemale() {
		return this.postcards.filter(item => item.gender === 'female');
	}

	getPostcardsMale() {
		return this.postcards.filter(item => item.gender === 'male');
	};

	_getPostcardById(id) {
		return this.postcards.filter(item => item.id === id)[0];
	}

	_generatePostcardText(canvas, canvasWidth, text, style) {
		canvas.fillStyle = style.color;
		canvas.font = style.size;

		text
			.split('\n')
			.forEach((item, i) => {
				const textWidth = canvas.measureText(item).width;
				canvas.fillText(
					item,
					canvasWidth / 2 - textWidth / 2,
					style.height + (i * style.lineHeight)
				);
			})
	}

	async generatePostcardImg(id, name) {
		const postcard = this._getPostcardById(id);

		const width = 590;
		const height = 820;

		const canvas = createCanvas(width, height)
		const context = canvas.getContext('2d')

		const loadImg = await loadImage(postcard.background)
		await context.drawImage(loadImg, 0, 0);

		this._generatePostcardText(context, width, postcard.title, postcard.styles.title);
		this._generatePostcardText(context, width, postcard.text, postcard.styles.text);
		this._generatePostcardText(context, width, name, postcard.styles.name);
		const buffer = await canvas.toBuffer('image/png')

		const random = Math.random() * (10000 - 1) + 1;
		const img = `/img/postcard-${random}.png`;
		fs.writeFileSync(`./public${img}`, buffer)

		return `${img}`;
	}
}

module.exports = Postcards;