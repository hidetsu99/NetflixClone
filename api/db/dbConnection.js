const mongoose = require("mongoose");

const DBConnection = () =>
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(`DB Connection successesfull`);
        })
        .catch((err) => {
            console.log(err);
        });

module.exports = DBConnection;
