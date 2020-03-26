
import { Request, Response, NextFunction, RequestHandler } from "express";

export function customMiddleware({ requireCookie = false}: { requireCookie: boolean }): RequestHandler {
    return function(request: Request, response: Response, next: NextFunction) {
        if (request.signedCookies?.userCookie) {
            const userCookie: string = request.signedCookies.userCookie;
            response.locals.userCookie = userCookie;
            return next();
        } else {
            if (requireCookie) {
                response.sendStatus(403);
                return next(new Error('Cookie was required for request but no cookie was found'));
            }
            return next();
        }
    }
}

export function strongMiddleware(params: any): RequestHandler{
    return (request: Request, response: Response, next: NextFunction) => {
        const {fullName, Password} = request.body;
        const strongParams: any = {};
        Object.entries(params).forEach(([weakParamKey, specifiedType])=> {
                if ((request.body != null) && request.body[weakParamKey] !== undefined && typeof request.body[weakParamKey] != "object") {
                    if (typeof request.body[weakParamKey] === specifiedType) {
                        strongParams[weakParamKey] = request.body[weakParamKey];
                    }
                }
            }
        );
        request.body = null;
        response.locals.strongParams = strongParams;
        return next();
    }
}
export function abc(): RequestHandler{
    return (request: Request, response: Response, next: NextFunction)=>{
        return next();
    }
}