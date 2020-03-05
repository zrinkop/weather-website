const request = require('request');


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoienB1bGppYyIsImEiOiJjazc3c3FwZWEwYTdzM2ZzNHN0dDV1ZjE4In0.rDJ_p8izI1LEUcYumdawuA';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback({error:'Unable to connect to location services'}, undefined);
        }
        else if (body.features.length === 0) {
            callback({error:'Unable to find location. Try another search.'});
        }
        else {
            callback(undefined, {
                 longitude: body.features[0].center[0],
                 latitude: body.features[0].center[1],
                 location: body.features[0].place_name
            })

        }
        })
    }

    module.exports = geocode; 