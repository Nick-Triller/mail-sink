var smtp = require("smtp-protocol");
var MailParser = require("mailparser").MailParser;

var mails = [];
var config;
var mailParser = new MailParser();

mailParser.on("end", function(parsed){
    // object structure for parsed e-mail
    mails.push(parsed);
    
    if (!config.quite) {
        console.log(parsed.html + "\n");
    }

    //trim list of emails if necessary
    while(mails.length > config.maxEmails) {
        mails.splice(1,1);
    }
});

function start() {
    smtp.createServer(function (req) {
        req.on("from", function (from, ack) {
            console.log("FROM: " + from);
            console.log(config.whitelist);
            if(config.whitelist.length == 0 || config.whitelist.indexOf(from) !== -1)
                ack.accept()
            else ack.reject()
        });

        req.on("message", function (stream, ack) {
            var message = "";
            
            stream.on("data",function(d) {
                message += d;
            });

            stream.on("end", function() {
                if(message != null) {
                    mailParser.write(message);
                    mailParser.end();
                }
                message = null;
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
}