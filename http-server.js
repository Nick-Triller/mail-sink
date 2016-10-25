var app = require("express")();
var pug = require("pug");

var mails = [];
var config;

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get('/', function (req, res) {
  res.type("html");
  res.render('index', { mails: mails });
});

app.get("/emails", function (req, res) {
  res.type("json");
  res.send(JSON.stringify(mails));
});

app.get("/emails/:index(\\d+)", function (req, res, next) {

  var index = +req.params["index"];
  if (index < 0 || index >= mails.length) {
    return next();
  }
  if (mails[index].html === undefined || mails[index].html === null) {
    // plain text mail
    res.type("text");
    // disable mime type sniffing
    res.set('X-Content-Type-Options', 'nosniff');
  } else {
    // html mail
    res.type("html");
  }
  res.send(mails[index].html || mails[index].text);
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
  start: function () {
    start();
  },
  setMails: function (mailsArg) {
    mails = mailsArg;
  },
  setConfig: function (configArg) {
    config = configArg;
  }
};
