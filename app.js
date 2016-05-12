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
var app = express();
//
//var finalParagraphInterceptor = interceptor(function (req, res) {
//    return {
//        // Only HTML responses will be intercepted
//        isInterceptable: function () {
//            return /text\/html/.test(res.get('Content-Type'));
//        },
//        // Appends a paragraph at the end of the response body
//        intercept: function (body, send) {
//
//            var $document = cheerio.load(body);
//
//            $document('html').append('<script src="/node_modules/reload/lib/sockjs-0.3-min.js"></script>');
//            $document('html').append('<script src="/node_modules/reload/lib/reload-client.js"></script>');
//            send($document.html());
//        }
//    };
//});
//
//// Add the interceptor middleware
//app.use(finalParagraphInterceptor);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

app.use('/', routes);
app.use('/users', users);

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
