/// <reference path="c:\users\vishnu mallipudi\documents\visual studio 2015\projects\messageboard\messageboard.tests\scripts\jasmine.js" />

/// <reference path="../../messageboard/scripts/angular.js" />
/// <reference path="../../messageboard/scripts/angular-mocks.js" />

/// <reference path="../../messageboard/scripts/angular-route.js" />
/// <reference path="../../messageboard/js/home-index.js" />

describe("home-index Tests->", function () {
    beforeEach(function () {
        module("myapp");
    });

    describe("topicservice", function () {
        it("can load Topics",inject( function (topicservice) {
            expect(topicservice.allTopics).toEqual([]);
        }));

    });

});