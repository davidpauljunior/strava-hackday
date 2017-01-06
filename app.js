const express = require('express');
const exphbs  = require('express-handlebars');
const strava = require('strava-v3');
const util = require('util');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    // http://strava.github.io/api/v3/activities/#get-feed
    // on page load can get first page, then can do ajax request for more at a later date

    strava.activities.listFriends({}, (err, payload) => {
        console.log('args here: \n', payload);
        if(!err) {
            res.render('home', {
                data: payload,
                props: util.inspect(payload, {showHidden: false, depth: null})
            });
        }
        else {
            console.log(err);
        }

        // payload.forEach(activity => {
        //     console.log('Athlete');
        //     console.log(activity.athlete);
        // });
    });

    // Note: atheles.get{id:123456} will get another user, but much less data (mostly useless oddly).
    // strava.athletes.get({id:1736644}, function(err, payload) {
    //     if(!err) {
    //         res.render('home', {
    //             username: payload.username,
    //             props: util.inspect(payload, {showHidden: false, depth: null})
    //         });
    //         console.log(payload);
    //         // res.send(
    //         //     payload
    //         // );
    //     }
    //     else {
    //         console.log(err);
    //     }
    // });

    // strava.activities.get({id:822362092},function(err, payload) {
    //     if(!err) {
    //         res.render('home', {
    //             username: payload.username,
    //             props: util.inspect(payload, {showHidden: false, depth: null})
    //         });
    //         console.log(payload);
    //         // res.send(
    //         //     payload
    //         // );
    //     }
    //     else {
    //         console.log(err);
    //     }
    // })
});

app.listen(3000, ()=> {
    console.log('Example app listening on port 3000')
});
