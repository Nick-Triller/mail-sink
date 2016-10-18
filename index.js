#!/usr/bin/env node
var cli = require("./cli");
var smtpServer = require("./smtp-server");
var httpServer = require("./http-server");
 
var config = cli.config;
 
console.log("SMTP server listening on port " + config.smtpPort);
console.log("HTTP server listening on port " + config.httpPort + ", e-mails are available on / (html) and /emails (json).");

smtpServer.setConfig(config);
httpServer.setConfig(config);

smtpServer.start();
httpServer.start();

var mailsRef = smtpServer.getMails();
httpServer.setMails(mailsRef);