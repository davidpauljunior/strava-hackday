const express = require('express');
const exphbs  = require('express-handlebars');
const strava = require('strava-v3');
const util = require('util');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    strava.athlete.get({},function(err, payload) {
        if(!err) {
            res.render('home', {
                username: payload.username,
                props: util.inspect(payload, {showHidden: false, depth: null})
            });
            console.log(payload);
            // res.send(
            //     payload
            // );
        }
        else {
            console.log(err);
        }
    })
});

app.listen(3000, ()=> {
    console.log('Example app listening on port 3000')
});
