"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var User = require('./schema/userSchema').User;
var bcrypt = require("bcrypt");
// @ts-ignore
var nanoid = require("nanoid");
var Express = require("express");
var Sessions = require('./SessionSchema').Sessions;
var UserCookieMiddleware_1 = require("./middleware/UserCookieMiddleware");
var UserCookieMiddleware_2 = require("./middleware/UserCookieMiddleware");
var app = Express();
// Use the cookie-parser middleware. If you want to used signed cookies, put a secret here.
// Note: This secret is a joke, generate a long secure random hash for this secret when you go to production
app.use(cookieParser(process.env.secrete));
app.use(Express.json());
var db_connect = mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });
app.post("/user-reg", [UserCookieMiddleware_2.strongMiddleware({ firstName: 'string', lastName: 'string', fullName: 'string', studentId: 'number', password: 'string' })], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("I am in user registration");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bcrypt.hash(response.locals.strongParams['Password'], 12, function (err, hash) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!err) return [3 /*break*/, 1];
                                    console.log("Problem in doing hash" + hash);
                                    return [2 /*return*/, response.sendStatus(404)];
                                case 1: return [4 /*yield*/, User.create({
                                        firstName: response.locals.strongParams['firstName'],
                                        lastName: response.locals.strongParams['lastName'],
                                        fullName: response.locals.strongParams['fullName'],
                                        studentId: response.locals.strongParams['studentId'],
                                        password: hash
                                    })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, response.sendStatus(200)];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log("Error performing the request" + err_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/session", [
    UserCookieMiddleware_1.customMiddleware({ requireCookie: false }),
    UserCookieMiddleware_2.strongMiddleware({ fullName: 'string', Password: 'string' })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var retailer, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!response.locals.userCookie) return [3 /*break*/, 2];
                console.log(response.locals.userCookie);
                return [4 /*yield*/, Sessions.findOne({ Session_ID: { $eq: response.locals.userCookie } })];
            case 1:
                retailer = _a.sent();
                if (retailer) {
                    console.log("User Exists");
                    return [2 /*return*/, response.send("You did a great login job").status(200)];
                }
                _a.label = 2;
            case 2:
                console.log("I am checking for username and password");
                return [4 /*yield*/, User.findOne({ fullName: { $eq: response.locals.strongParams['fullName'] } })];
            case 3:
                user = _a.sent();
                if (!user) {
                    console.log("Invalid username/password");
                    return [2 /*return*/, response.sendStatus(400)];
                }
                return [4 /*yield*/, bcrypt.compare(response.locals.strongParams['password'], user.Password, function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
                        var sessionid, num_of_sessions, deleted_session;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        console.log("There is an error checking password" + err.message);
                                    if (!result) return [3 /*break*/, 9];
                                    console.log("I have successfully authenticated, now I am creating a session for the user");
                                    sessionid = nanoid();
                                    // I am omitting collisions because they occur 1 in 1 million
                                    console.log(sessionid);
                                    console.log("I have created a cookie for you ...");
                                    return [4 /*yield*/, Sessions.find({ fullName: { $eq: response.locals.strongParams['fullName'] } })];
                                case 1:
                                    num_of_sessions = _a.sent();
                                    console.log("Number of sessions are: " + num_of_sessions.length);
                                    if (!(num_of_sessions.length >= 5)) return [3 /*break*/, 3];
                                    console.log("I am deleting one of the session........");
                                    return [4 /*yield*/, Sessions.findOneAndDelete({ fullName: { $eq: response.locals.strongParams['fullName'] } })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [4 /*yield*/, Sessions.findOne({ $and: [{ fullName: { $eq: response.locals.strongParams['fullName'] } }, { Session_ID: { $eq: sessionid } }] })];
                                case 4:
                                    deleted_session = _a.sent();
                                    if (!deleted_session) return [3 /*break*/, 6];
                                    return [4 /*yield*/, Sessions.updateOne({ $and: [{ fullName: response.locals.strongParams['fullName'] }, { Session_ID: { $eq: null } }] }, { Session_ID: sessionid })];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 8];
                                case 6: return [4 /*yield*/, Sessions.create({ Session_ID: sessionid, fullName: response.locals.strongParams['fullName'] })];
                                case 7:
                                    _a.sent();
                                    _a.label = 8;
                                case 8:
                                    console.log("You now have a signed cookie");
                                    response.cookie("userCookie", sessionid, { signed: true, secure: false, httpOnly: true });
                                    response.send('You now have a cookie called userCookie!');
                                    return [3 /*break*/, 10];
                                case 9:
                                    console.log("Invalid Credentials");
                                    return [2 /*return*/, response.sendStatus(400)];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// GET request that sets a cookie. We are using our custom middleware here, however it serves no purpose.
app.get('/user_home', UserCookieMiddleware_1.customMiddleware({ requireCookie: false }), function (request, response) {
    // Sign the cookie with the above secret
    response.cookie('userCookie', 'I am the user cookie!', { signed: true });
    response.send('You now have a cookie called userCookie!');
});
// 'Authorized' GET request that uses our custom middleware to check for a cookie and respond only if the cookie exists
app.get('/requiredCookieRoute', UserCookieMiddleware_1.customMiddleware({ requireCookie: true }), function (request, response) {
    response.send('You have the right cookie! It says ' + response.locals.userCookie);
});
app.listen(5000);
