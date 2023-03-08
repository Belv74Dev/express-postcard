const express = require('express');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const postcardRoutes = require('./routes/postcard');


const app = express();

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/postcard', postcardRoutes);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});