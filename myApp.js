require('dotenv').config();
const bodyParser = require('body-parser')
let express = require('express');
let app = express();
console.log("Hello World")

//use middleware
app.use(logger);
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({time: req.time});
})

//bodyParser
app.use(bodyParser.urlencoded({extended: false}))

//serve string to server
app.get('/', handleSendString); 
//serve data
app.get('/json', handleSendJson);
//serve static files like css
app.use('/public', express.static(__dirname + '/public'))

app.get('/:word/echo', (req, res) => {
    const msg = {echo: req.params.word}
    res.json(msg);
})

//GET and POST name
app.route('/name').get(handleGetName).post(handlePostName)

function handleSendString(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

function handleSendJson(req, res) {
    const msg = process.env.MESSAGE_STYLE === "uppercase" ? {message: "HELLO JSON"} : {message: "Hello json"};
    res.json(msg);
}

function logger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}

function handleGetName(req, res) {
    const msg = {name: `${req.query.first} ${req.query.last}`};
    res.json(msg);
}

function handlePostName(req, res) {
    const msg = {name: `${req.body.first} ${req.body.last}`}
    res.json(msg)
}



































 module.exports = app;
