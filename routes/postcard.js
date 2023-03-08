const { Router } = require('express');
const router = Router();

const data = require('./../data/postcard.json');
const Postcards = require('../models/postcards');

router.post('/', async (req, res) => {
	const { postcardId, name } = req.body;

	const postcards = new Postcards(data);

	const postcardImg = await postcards.generatePostcardImg(postcardId, name);

	res.render('postcard', {
		title: 'Ваша открытка',
		postcardImg: postcardImg,
	});
});

module.exports = router;