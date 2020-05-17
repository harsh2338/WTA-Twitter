const express = require("express");
const app = express();
const socketsio = require('socket.io');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('./config/database_config');

const bodyParser = require("body-parser");

const tweets = require("./routes/tweets");
const auth = require('./routes/auth');

const PORT = 3000
const server = app.listen(PORT, () => console.log("listening at", PORT));
const io = socketsio(server);
require('./services/stream')(io);

app.use(bodyParser.json());
app.use(cors());

app.use("/tweets", tweets);
app.use("/auth", auth);
app.get("/stream", (req, res) => { res.sendFile(__dirname + '/public/client.html') });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
module.exports = app;