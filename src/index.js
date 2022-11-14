const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const helpers = require('handlebars-helpers');
var math = helpers.math();
var comparison = helpers.comparison();
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes');
const db = require('./config/db');
const favicon = require('serve-favicon');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
//connect to db
db.connect();

dotenv.config();
//HTTP Logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

//urlencoded + json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Template Engine
app.engine('.hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        isGK: function (position) {
            return position === "GK"
        },
        isTooLong: function (name) {
            return name.length > 12
        }
    }

}));

// Method Overrides
app.use(methodOverride('_method'))

// set favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

route(app);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});