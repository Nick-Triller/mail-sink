var smtp = require("smtp-protocol");
var MailParser = require("mailparser").MailParser;

var mails = [];
var config;

/**
 * Returs a new MailParser instance. Use a new instance for each email.
 * @returns {*|MailParser} MailParser instance
 */
function getMailparser() {
    var mailParser = new MailParser();
    mailParser.on("end", function(parsed){
        mails.push(parsed);

        if (!config.quite) {
            console.log(parsed.headers);
            console.log(parsed.html);
            console.log();
        }

         //trim list of emails if necessary
         while(mails.length > config.maxEmails) {
            mails.splice(1,1);
         }
    });
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

            stream.on("data",function(d) {
                mailParser.write(d);
            });

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