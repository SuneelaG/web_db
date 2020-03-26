"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function customMiddleware(_a) {
    var _b = _a.requireCookie, requireCookie = _b === void 0 ? false : _b;
    return function (request, response, next) {
        var _a;
        if ((_a = request.signedCookies) === null || _a === void 0 ? void 0 : _a.userCookie) {
            var userCookie = request.signedCookies.userCookie;
            response.locals.userCookie = userCookie;
            return next();
        }
        else {
            if (requireCookie) {
                response.sendStatus(403);
                return next(new Error('Cookie was required for request but no cookie was found'));
            }
            return next();
        }
    };
}
exports.customMiddleware = customMiddleware;
function strongMiddleware(params) {
    return function (request, response, next) {
        var _a = request.body, fullName = _a.fullName, Password = _a.Password;
        var strongParams = {};
        Object.entries(params).forEach(function (_a) {
            var weakParamKey = _a[0], specifiedType = _a[1];
            if ((request.body != null) && request.body[weakParamKey] !== undefined && typeof request.body[weakParamKey] != "object") {
                if (typeof request.body[weakParamKey] === specifiedType) {
                    strongParams[weakParamKey] = request.body[weakParamKey];
                }
            }
        });
        request.body = null;
        response.locals.strongParams = strongParams;
        return next();
    };
}
exports.strongMiddleware = strongMiddleware;
function abc() {
    return function (request, response, next) {
        return next();
    };
}
exports.abc = abc;
