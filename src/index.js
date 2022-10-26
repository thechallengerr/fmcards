const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const Event = require('./app/models/Event');

//connect to db
db.connect();

//HTTP Logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

//urlencoded + json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Engine
app.engine('.hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        async getEventThumb(event_slug) {
            let event_thumb = Event.findOne({ event_slug: event_slug }).then((event) => {
                if (event === null) {
                    return ""
                } else {
                    event_thumb = event.event_thumb;
                }

                return event.event_thumb;
            }).catch((err) => {
                console.error(err);
            });

            // console.log(event_thumb);
            var res = await event_thumb
            return res;
        },
    }

}));

const hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.

});

route(app);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});