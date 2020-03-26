
const mongoose = require('mongoose');
const assert = require('chai').assert;
const Booking = require('../src/schema/bookingSchema').Booking;

const booking_1 = new Booking({City_name: "WestHaven", Car_type: "premium", Hours: 15, License_number: "S12345678" });
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

describe("City_name length", function () {
    it("City length", function () {
        const cityname = booking_1.City_name.length;
        assert.isAbove(cityname, 3)
    })
});

describe("Car_type length", function () {
    it("Car length", function () {
        const cartype = booking_1.Car_type.length;
        assert.isAbove(cartype, 3)
    })
});

describe("Hours more than 0", function () {
    it("number of hours", function () {
        const hrs = booking_1.Hours;
        assert.isAbove(hrs,0)
    })
});

describe("License_number length", function () {
    it("License length", function () {
        const lsno = booking_1.License_number.length;
        assert.isAbove(lsno, 7)
        assert.isBelow(lsno, 11);
    })
});

describe('All fields check', function () {
    it('mandatory fields',  function () {
        function checknullorundefined(field){
            return field === null || field === undefined;
        }
        const case1 = checknullorundefined(booking_1.City_name);
        const case2 = checknullorundefined(booking_1.Car_type);
        const case3 = checknullorundefined(booking_1.Hours);
        const case4 = checknullorundefined(booking_1.License_number);
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
