// All requirements
const express = require("express");
require("dotenv").config();
const DBConnection = require("./db/dbConnection");
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const moviesRoute = require('./routes/movies')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/movies', moviesRoute)

try {
    DBConnection();
    app.listen(port, () => {
        console.log(`server listening at ${port} `);
    });
} catch (error) {
    console.log(error);
}
