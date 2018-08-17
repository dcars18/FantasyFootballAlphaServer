const express = require('express');
const app = express();
//const axios = require('axios');
const http = require('http');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/players', (req, res) => {
    var pos = req.query.pos;
    //console.log(pos);

    http.get('http://fftoday.com/stats/players?Pos='+pos, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data).explanation);
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.get('/season', (req, res) => {
    var url = req.query.stats;
    //Decode the request param...
    var formattedURL = url.replace('(', '/');
    console.log(formattedURL);

    http.get('http://fftoday.com'+formattedURL, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.get('/run_pass', (req, res) => {
    var season = req.query.season;

    http.get('http://fftoday.com/stats/'+season+'_run_pass_ratios.html', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data).explanation);
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.listen(3000, () => console.log('Fantasy Server listening on port 3000...'));