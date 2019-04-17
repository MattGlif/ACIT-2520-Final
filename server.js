const hbs = require('hbs');
const bodyParser = require('body-parser');
const express = require('express');
const port = process.env.port || 8080;

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
        title: 'Links page',
        // year: new Date().getFullYear(),
        welcome: 'What Up?',
        pages: ['/about', '/currency']
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        // year: new Date().getFullYear(),
        welcome: '',
        pages: ['/links', '/currency']

    });
});




app.get('/currency', (request, response) => {
    currency.getResults(250, 'CAD', 'USD').then((result) => {
        response.render('currency.hbs', {
            title: 'Currency',
            welcome: '',
            result: result,
            pages: ['/links', '/about']
        })    
    }).catch((error) => {
        response.send(error);
    })
});

app.listen(port, () => {
    console.log('Server is up on the port 8080');
});