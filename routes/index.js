const express = require('express');
const request = require('request');
const router = express.Router();

// Load Google Maps
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDWTiX4-gq_aD2NIdOkhnJgnqCil_9FRSs',
    Promise: Promise
});

router.get('/', (req, res) => {
    res.render('index/index');
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

router.get('/places', (req, res) => {
    res.render('index/places');
});

router.get('/explore', (req, res) => {
    res.render('index/explore');
});

router.post('/explore', (req, res) => {

    request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
            client_id: 'Q1W2C1ZFAEAUDKOMZREQ1IOOY1I5RJ3ZCWM4ZHZUNEFOIYIK',
            client_secret: 'DCRMKR2CQMLZST2NXP4YJMTECCFYVFAE1LQSED0UFJSUVAIL',
            ll: `${req.body.lat}, ${req.body.lng}`,
            query: req.body.query,
            v: '20180323',
            radius: 100000,
            limit: 100
        }
        }, function(err, response, data) {
        if (err) {
            console.error(err);
        } else {
            places = JSON.parse(data);          // Convert to JSON
            places = places.response.groups;    // Iterate to Array of Objects
            places = places[0].items;           // Iterate to response

            //console.log(places);
            return res.json({
                places: places
            });
        }
    });
});

module.exports = router;