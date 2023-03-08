const { Router } = require('express');
const router = Router();

const data = require('./../data/postcard.json');
const Postcards = require('../models/postcards');

router.get('/', (req, res) => {
	const postcards = new Postcards(data);

	const postcardsFemale = postcards.getPostcardsFemale();
	const postcardsMale = postcards.getPostcardsMale();

	res.render('home', {
		title: 'Создайте открытку',
		postcardsFemale,
		postcardsMale
	});
});

module.exports = router;