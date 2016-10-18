var http = require("http");

var mails = [];
var config;

function start() {
    http.createServer(function (req, res) {
        switch (req.url) {
            case "/":
                res.writeHead(200, {"Content-Type": "text/html"});
                var page = '<html><meta charset="utf-8"/><head></head><body><h1>Mail Sink</h1><a href="/emails">Emails as json</a><hr>'
                for (var i=0; i < mails.length; i++) {
                    page += "<pre>" + JSON.stringify(mails[i].headers, null, 2) + "</pre>"
                    page += mails[i].html;
                    page += "<hr>";
                }
                page += '</body></html>';
                res.end(page);
                break;
            case "/emails":
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(mails));
                break;
            default:
                notFound(res)
        }
    }).listen(config.httpPort);
}

function notFound(res) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("Not found");
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
}