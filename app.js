// global vars
global.__rootDir = __dirname + '/';

//Import libs
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage }).single('file');

// mongoose connection
var mongoose = require('mongoose');
var db = require('./configs/database');
mongoose.connect(db.url);

var app = express(); 

var website = require('./controllers/website/index.js');
var admin = require('./controllers/admin/index.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/mine.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//public libs
app.use('/libs/ng', express.static(path.join(__dirname, '/node_modules/angular')));
app.use('/libs/ng-route', express.static(path.join(__dirname, '/node_modules/angular-route')));
app.use('/libs/requirejs', express.static(path.join(__dirname, '/node_modules/requirejs')));
app.use('/libs/domready', express.static(path.join(__dirname, '/node_modules/requirejs-domready')));
app.use('/libs/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/libs/ng-file-upload', express.static(path.join(__dirname, '/node_modules/ng-file-upload')));
app.use('/libs/angular-sanitize', express.static(path.join(__dirname, '/node_modules/angular-sanitize')));
app.use('/libs/angular-cookies', express.static(path.join(__dirname, '/node_modules/angular-cookies')));
app.use('/libs/angular-md5', express.static(path.join(__dirname, '/node_modules/angular-md5')));
app.use('/libs/angular-ckeditor', express.static(path.join(__dirname, '/node_modules/angular-ckeditor')));
app.use('/libs/ckeditor', express.static(path.join(__dirname, '/node_modules/ckeditor')));
app.use('/libs/ng-table', express.static(path.join(__dirname, '/node_modules/ng-table')));
app.use('/libs/angular-flash-alert', express.static(path.join(__dirname, '/node_modules/angular-flash-alert')));

// multer upload url
app.post('/api/uploads', function (req, res) {
    upload(req, res, function (err,data) {
        if (err) {
            // An error occurred when uploading
            return res.end("Error uploading file.");
        }
        res.send('/uploads/' + req.file.filename);
    })
});
app.use('/api/', website);
app.use('/api/admin/', admin);

app.get('/admin/login(/*)?', function (req, res) {
    res.render('admin/login');
});

app.get('/admin(/*)?', function (req, res) {
    res.render('admin/index');
});

app.get('*', function (req, res) {
    res.render('website/index');
});

// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

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