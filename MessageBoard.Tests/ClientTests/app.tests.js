/// <reference path="c:\users\vishnu mallipudi\documents\visual studio 2015\projects\messageboard\messageboard.tests\scripts\jasmine.js" />

/// <reference path="c:\users\vishnu mallipudi\documents\visual studio 2015\projects\messageboard\messageboard.tests\scripts\jasmine.js" />
/// <reference path="../../messageboard/js/myapp.js" />


describe("myapp tests", function () {
    it("isDebug", function () {
        expect(app.isDebug).toEqual(true);
    });
    it("log", function () {
        expect(app.log).toBeDefined();
        app.log("testing");
    });

});
