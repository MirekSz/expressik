/// <reference path='./typings/tsd.d.ts' />

var express = require('express');
//var cheerio = require('cheerio');
var interceptor = require('express-interceptor');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var moves = require('./routes/moves');
var app = express();

var exphbs = require('express-handlebars');
//https://github.com/ericf/express-handlebars

var hbs = exphbs.create({
    defaultLayout: 'default', extname: '.hbs', helpers: {
        foo: function () {
            return 'FOO!';
        },
        bar: function () {
            return 'BAR!';
        },
        js: function (context) {
            var dest = {};
            Object.assign(dest, context);
            delete dest.settings;
            delete dest._locals;
            delete dest.cache;
            return JSON.stringify(dest);
        }
    }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

var reqMiddle = require('./service/UknownMiddleware');
var resMiddle = require('./service/ResponseMiddleware');

app.use(function (req, res, next) {
    if (req.path.endsWith('json')) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Autor", "MIrek");
        var path = req.url.split('.')[0];
        console.log('mam', path, req.path,res.header());
        req.url = path;
    }
    next();
})

app.use(reqMiddle);
app.use('/', routes);
app.use('/users', users);
app.use('/', moves);
app.use(resMiddle);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
