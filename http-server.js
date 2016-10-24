var app = require("express")();
var pug = require("pug");

var mails = [];
var config;

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get('/', function (req, res) {
    res.type("html");
    res.render('index', { mails: mails});
});

app.get("/emails", function (req, res) {
    res.type("json");
    res.send(JSON.stringify(mails));
});

app.get("/emails/:index(\\d+)", function (req, res, next) {
    res.type("html");
    var index = +req.params["index"];
    if (index < 0 || index >= mails.length) {
        return next();
    }
    res.send(mails[index].html);
});

app.all("*", function (req, res) {
    res.type("text");
    res.status(404);
    res.send("Not found");
});

function start() {
    app.listen(config.httpPort);
}

module.exports = {
	start: function() {
        start();
    },
    setMails: function(mailsArg) {
        mails = mailsArg;
    },
    setConfig: function(configArg) {
        config = configArg;
    }
};
