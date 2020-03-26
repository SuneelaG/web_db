
const mongoose = require('mongoose');
const assert = require('chai').assert;
const User = require('../src/schema/userSchema').User;

const user_1 = new User({User_name: "Suneela", Contact_number : 4567890123, Country_name: "USA",  Password: "SUNZabc123"});

before(function (done) {
    const db_connect =  mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true} );
    const db = mongoose.connection;
    db.on('error', (error)=>{
        done(error)
    });
    db.once('open', function () {
        console.log("connected to database");
        done()
    })
});

describe("User_name length", function () {
    it("name length", function () {
        const usname = user_1.User_name.length;
        assert.isAbove(usname, 3)
    })
});

describe("Contact_number length", function () {
    it("number length", function (){
        const val = user_1.Contact_number;
        assert.isTrue(val > 999999999 && val < 9999999999 );
    })
});

describe("Country_name length", function () {
    it("Cname length", function () {
        const cntryname = user_1.Country_name.length;
        assert.isAbove(cntryname, 2)
    })
});

describe("Password length", function () {
    it('pswd validation',  function () {
        const pswd = user_1.Password.length;
        console.log(pswd);
        assert.isAbove(pswd, 8);
        assert.isBelow(pswd, 12);
        const pswd1 = /[a-z]/;
        const pswd2 = /[A-Z]/;
        const pswd3 = /[0-9]/;
        const k = user_1.Password;
        console.log(k)
        const psd1 = pswd1.test(k);
        const psd2 = pswd2.test(k);
        const psd3 = pswd3.test(k);
        console.log("The value of is: "+ psd2)
        if(psd1){
            console.log("Passed test 1")
        }
        if(psd2){
            console.log("Passed test 2")
        }
        if(psd3){
            console.log("Passed test 3")
        }
        assert.isTrue(psd1 && psd2 && psd3);
    })
});

describe('All fields check', function () {
    it('mandatory fields',  function () {

        function checknullorundefined(field){
            return field === null || field === undefined;
        }
        const case1 = checknullorundefined(user_1.User_name);
        const case2 = checknullorundefined(user_1.Contact_number);
        const case3 = checknullorundefined(user_1.Country_name);
        const case4 = checknullorundefined(user_1.Password);
        assert.isFalse(case1 || case2 || case3 || case4)
    })
});

after(async function(){
    try {
        await mongoose.connection.db.dropDatabase();
    }
    catch (e) {
        console.log(e)
    }
});