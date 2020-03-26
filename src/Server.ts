
import { Application, Request, Response } from 'express';
import cookieParser = require('cookie-parser');
import mongoose = require('mongoose');
const User = require('./schema/userSchema').User
import bcrypt = require('bcrypt');
// @ts-ignore
import nanoid = require('nanoid');
import Express = require('express')
const Sessions = require('./SessionSchema').Sessions;
import { customMiddleware } from './middleware/UserCookieMiddleware';
import { strongMiddleware } from './middleware/UserCookieMiddleware';

const app: Application = Express();
app.use(cookieParser(process.env.secrete));
app.use(Express.json());

const db_connect =  mongoose.connect("mongodb://localhost:27017/testdb", {useNewUrlParser: true} );

app.post("/user-reg",[strongMiddleware({firstName: 'string', lastName: 'string', fullName: 'string', studentId: 'number', password: 'string'})],
    async (request: Request, response: Response) => {
    try {
        await bcrypt.hash(response.locals.strongParams['Password'], 12, async (err, hash) => {
            if (err) {
                console.log("Error in hashing" + hash);
                return response.sendStatus(404)
            } else {
                await User.create({
                    firstName: response.locals.strongParams['firstName'],
                    lastName: response.locals.strongParams['lastName'],
                    fullName: response.locals.strongParams['fullName'],
                    studentId:  response.locals.strongParams['studentId'],
                    password: hash
                });
                return response.sendStatus(200)
            }
        });
    }
    catch(err){
        console.log("Error: "+ err.message)
    }
});

app.post("/session", [
    customMiddleware({requireCookie: false}),
    strongMiddleware({fullName: 'string', Password: 'string'})],
     async (request: Request, response: Response) =>{
    if(response.locals.userCookie) {
        console.log(response.locals.userCookie);
        const retailer = await Sessions.findOne({Session_ID: {$eq: response.locals.userCookie}});
        if (retailer) {
            console.log("User Exists");
            return response.send("logged in").status(200)
        }
    }
    console.log("checking username and password");
    const user = await User.findOne({fullName: {$eq: response.locals.strongParams['fullName']}});
    if (!user) {
        console.log("Invalid username/password");
        return response.sendStatus(400)
    }
    await bcrypt.compare(response.locals.strongParams['password'], user.Password, async (err, result) => {
        if (err) console.log("Error in checking password" + err.message);
        if (result) {
            console.log("Authenticated successfully, creating session for user");
            let sessionid: string = nanoid();
            console.log(sessionid);
            console.log("Created cookie successfully");
            const num_of_sessions = await Sessions.find({fullName: {$eq: response.locals.strongParams['fullName']}});
            console.log("Sessions count: : "+ num_of_sessions.length);
            if(num_of_sessions.length >=5){
                console.log("Deleting session");
                await Sessions.findOneAndDelete({fullName: {$eq: response.locals.strongParams['fullName'] }})
            }
            const deleted_session = await Sessions.findOne( {$and: [{fullName: {$eq: response.locals.strongParams['fullName']}}, {Session_ID: {$eq: sessionid}}] } );
            if(deleted_session){
                await Sessions.updateOne({$and: [{fullName: response.locals.strongParams['fullName']}, {Session_ID: {$eq: null}}]}, {Session_ID: sessionid});
            }
            else {
                await Sessions.create({Session_ID: sessionid, fullName: response.locals.strongParams['fullName']});
            }
            response.cookie("userCookie", sessionid, {signed: true, secure: false, httpOnly: true});
            response.send('Cookie name: userCookie!');
        }
        else{
            console.log("Invalid Credentials");
            return response.sendStatus(400)
        }
    });
});

app.get('/user_home', customMiddleware({requireCookie: false}), (request: Request, response: Response) => {
    response.cookie('userCookie', 'user cookie!', { signed: true });
    response.send('You now have a cookie called userCookie!');
});
app.get('/requiredCookieRoute', customMiddleware({requireCookie: true}), (request: Request, response: Response) => {
    response.send('You have the right cookie! It says ' + response.locals.userCookie);
});
app.listen(5000);