
import Mongoose from "mongoose";

import {User} from "./schema/userSchema";

// Playground for interfacing with Mongoose
(async () => {

    await Mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

    const user = await new User({ firstName: 'Suneela', lastName: 'Gudise', studentId: '12345', Password: 'Suneela233'});
    user.fullName = "Suneela-Gudise"

    const savedUser = await user.save();
    console.log(savedUser);

    process.exit(0);
})();