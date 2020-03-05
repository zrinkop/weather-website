const request = require('request');

forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/677a770d98a1c7534a166c290667c530/' + longitude +','+ latitude +'?units=si';

    request({url, json: true}, (error, {body}) => {

        if(error){
        
            callback({error:'Unable to connect to weather app service...'}, undefined)
        
        }
        else if (body.error) {
            callback({error:'Unable to find location.'}, undefined)
        }
        else {
        
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' and there is a ' + body.currently.precipProbability + ' chance for rain.');
        }
        })

}

module.exports = forecast;