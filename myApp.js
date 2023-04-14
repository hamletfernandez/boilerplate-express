require('dotenv').config();
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

//serve string to server
app.get('/', handleSendString); 
//serve data
app.get('/json', handleSendJson);
//serve static files like css
app.use('/public', express.static(__dirname + '/public'))


function handleSendString(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

function handleSendJson(req, res) {
    const msg = process.env.MESSAGE_STYLE === "uppercase" ? {"message": "HELLO JSON"} : {"message": "Hello json"};
    res.json(msg);
}

function logger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}




































 module.exports = app;
