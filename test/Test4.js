
const sinon = require('sinon');
const httpmock = require('node-mocks-http');
const assert = require('chai').assert;
const expect = require('chai').expect;
const customMiddleware = require('../src/middleware/UserCookieMiddleware').customMiddleware;
const strongMiddleware = require('../src/middleware/UserCookieMiddleware').strongMiddleware;

//--------------------------------------   custom Middleware test cases  ---------------------------------------------

describe("Testing Middleware_Test1", function(){
    it("Calling Next function when requireCookie is true", function(){
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session'
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        customMiddleware({requireCookie: true})(request, response, next);
        sinon.assert.calledOnce(next)
    })
});

describe("Testing Middleware_Test2", function () {
    it("sending cookies", function () {
        const request = httpmock.createRequest({
            method: 'POST',
            url: '/session'
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        customMiddleware({requireCookie: false})(request, response, next);
        sinon.assert.calledOnce(next)
    });
});

describe("Testing Middleware_Test3", function (){
    it("Next functions should have 0 arguments when called with false", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session'
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        customMiddleware({requireCookie: false})(request, response, next);
        expect(next.getCall(0).args[0]).to.equal(undefined)
    })
});

describe("Testing Middleware_Test4", function(){
    it("When true and cookie does not exists_return error", function(){
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session',
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        customMiddleware({requireCookie: true})(request, response, next);
        next.threw('No required cookie is found')
    })
});

describe("Testing Middleware_Test5", function () {
    it("required cookie is false and cookie does not exist then call return", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session'
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        customMiddleware({requireCookie: false})(request, response, next);
        sinon.assert.called(next)
    })
});

//--------------------------------------   Strong Middleware test cases  ---------------------------------------------

// To test strong parameter
describe("Testing Middleware_Test6", function () {
    it("To check if request body is null", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session'
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        strongMiddleware({fullName: 'int'})(request, response, next)
        assert.isNull(request.body, "null")
    })
});

describe("Testing Middleware_Test7", function () {
    it("check if strong params is not empty", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session',
            body: {fullName: "Suneela-Gudise", Password: "Suneela233"}
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        strongMiddleware({fullName: 'string'})(request, response, next);
        assert.equal(response.locals.strongParams['fullName'], "Suneela-Gudise");
    })
});

describe("Testing Middleware_Test8", function () {
    it("check if strong params is empty", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session',
            body: {fullName: "Suneela-Gudise", Password: "Suneela233"}
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        strongMiddleware({fullName: 'number'})(request, response, next);
        assert.equal(response.locals.strongParams['fullName'], undefined);
    })
});

describe("Testing Middleware_Test9", function(){
    it("Next function should be called when requireCookie is true", function(){
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session',
            body: {fullName: "Suneela-Gudise", Password: "Suneela233"}
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        strongMiddleware({fullName: 'string'})(request, response, next);
        sinon.assert.calledOnce(next)
    })
});

describe("Testing Middleware_Test10", function (){
    it("Next functions should have 0 arguments when called with false", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session',
            body: {fullName: "Suneela-Gudise", Password: "Suneela233"}
        });
        const response = httpmock.createResponse();
        const next = sinon.spy();
        strongMiddleware({fullName: 'string'})(request, response, next);
        expect(next.getCall(0).args[0]).to.equal(undefined)
    })
});

describe("Testing Middleware_Test11", function () {
    it("Check if request body is null", function () {
        const request = httpmock.createRequest({
            method : 'POST',
            url: '/session',
            body: null
        });
        const response = httpmock.createResponse()
        const next = sinon.spy();
        strongMiddleware({})(request, response, next);
        console.log(response.locals.strongParams);
        assert.equal(Object.entries(response.locals.strongParams).length, 0)
    })
});

describe("Testing Middleware_Test12", function () {
    it("check if request body parameter is object", function () {
        const request = httpmock.createRequest({
            method: 'POST',
            url: '/session',
            body: {fullName: {fullName: {$gt: 0}}, Password: "Suneela233"}
        })
        const response = httpmock.createResponse()
        const next = sinon.spy();
        strongMiddleware({fullName: 'object', Password: 'string'})(request, response, next);
        console.log(response.locals.strongParams);
        assert.isUndefined(response.locals.strongParams['fullName'])
    })
});


