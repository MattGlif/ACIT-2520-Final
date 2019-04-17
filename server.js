const hbs = require('hbs');
const bodyParser = require('body-parser');
const express = require('express');
const nasa_api = require('./public/nasa_api.js');
const port = process.env.PORT || 8080;

var app = express();
var urlencode = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    response.render('info.hbs', {
        title: 'Landing page',
        // year: new Date().getFullYear(),
        welcome: 'What Up?',
        pages: ['/about', '/currency']
    });
});

app.get('/nasa', (request, response) => {
    response.render('nasa_form.hbs')
})

app.post('/nasa', urlencode, async(request, response) => {
    response.render('nasa_form.hbs')
})

// app.listen(process.env.PORT, '0.0.0.0')
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});