
const mongoose = require('mongoose');
const assert = require('chai').assert;
const Reservation = require('../src/schema/reservationSchema').Reservation;

const reservation_1 = new Reservation({Car_type: "premium", Hours: 15, Comments: "NA" });
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

describe("Car_type length", function () {
    it("Car length", function () {
        const cartype = reservation_1.Car_type.length;
        assert.isAbove(cartype, 3)
    })
});

describe("Car type exists", function () {
    it("Type of Car", function () {
        assert.exists(reservation_1.Car_type)
    })
});

describe("To check if Hours is number", function () {
    it("Hours check", function () {
        assert.isNotNaN(reservation_1.Hours)
    })
});

describe("Hours exists", function () {
    it("No of hours", function () {
        assert.exists(reservation_1.Hours)
    })
});

describe("Comments length", function () {
    it("Comment length", function () {
        const cmnt = reservation_1.Comments.length;
        assert.isAbove(cmnt, 0)
        assert.isBelow(cmnt, 100);
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
