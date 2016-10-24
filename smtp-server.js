var smtp = require("smtp-protocol");
var MailParser = require("mailparser").MailParser;
var fs = require("fs");
var path = require("path");

var mails = [];
var config;

/**
 * Processes a mail
 * @param mail
 */
function process(parsed) {
    mails.push(parsed);
    // Log to console if enabled
    if (!config.quite) {
        console.log(parsed.headers);
        console.log(parsed.html);
        console.log();
    }
    // Write to file if enabled
    if (config.dump) {
        var filename =  new Date(parsed.headers["date"]).getTime() +
            "-" + parsed.headers["message-id"].slice(1, -1) + ".json";
        console.log(filename);
        var savePath = path.join(config.dump, filename);
        var text = JSON.stringify(parsed, null, 2);
        fs.writeFile(savePath, text, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }
    //trim list of emails if necessary
    while(mails.length > config.maxEmails) {
        mails.splice(1,1);
    }
}

/**
 * Returs a new MailParser instance. Use a new instance for each email.
 * @returns {*|MailParser} MailParser instance
 */
function getMailparser() {
    var mailParser = new MailParser();
    mailParser.on("end", process);
    return mailParser;
}

function start() {
    smtp.createServer(function (req) {

        if (config.whitelist) {
            req.on("from", function (from, ack) {
                if (config.whitelist.length == 0 || config.whitelist.indexOf(from) !== -1)
                    ack.accept();
                else ack.reject()
            });
        }

        req.on("message", function (stream, ack) {
            // New MailParser instance for each mail
            var mailParser = getMailparser();
            // Receive data
            stream.on("data",function(d) {
                mailParser.write(d);
            });
            // All data received
            stream.on("end", function() {
                mailParser.end("");
            });

            ack.accept();
        });

    }).listen(config.smtpPort);
}

module.exports = {
	start: function() {
        start()
    },
    getMails: function() {
        return mails;
    },
    setConfig: function(configArg) {
        config = configArg;
    }
};