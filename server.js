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
    try {
        if (request.body.picture_input === null) throw "Please Enter A Valid Item";
        let NASAoutput = await nasa_api.get_pictures(request.body.picture_input);

        response.render('nasa_form.hbs', {
            output1: NASAoutput[0],
            output2: NASAoutput[1],
            output3: NASAoutput[2],
            output4: NASAoutput[3],
            output5: NASAoutput[4],
            output6: NASAoutput[5]
        });
    }catch (e) {
        response.render('nasa_form.hbs', {
            output: e
        });
    }
})

// app.listen(process.env.PORT, '0.0.0.0')
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});