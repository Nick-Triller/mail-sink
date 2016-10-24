var assert = require("assert");
var cli = require("./../cli");

describe("Version number", function() {
  it("in package.json and cli should match", function() {
    const packageJson = require("./../package.json");
    assert.equal(packageJson.version, cli.config.version);
  });
});
