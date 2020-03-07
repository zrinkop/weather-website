const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Zrinko PUljic'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help page.',
        title: 'Help',
        name: 'Zrinko'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather about',
        name: 'Zrinko PUljic'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You need to provide a address.'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send(error);
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send(error);
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
          })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zrinko PUljic',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zrinko PUljic',
        errorMessage: 'Page not found'
    });
})

const port = process.env.port || 3000
app.listen(port, () => {
    console.log('Server is up on the port '+port + '...')
});