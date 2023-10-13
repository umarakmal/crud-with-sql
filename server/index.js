const express = require("express");
const cors = require("cors");
const dbConfig = require("./db/database");
const userRoutes = require("./routes/index");
// const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser')
var path = require("path");
app.use(bodyParser.json())
var corsOptions = {
    origin: "http://localhost:3000"
};
// global.__basedir = __dirname + "/..";
app.use(cors(corsOptions));
// app.use(fileUpload());
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.static(__dirname + "/public"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

async function dbConnection() {
    try {
        await dbConfig.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Connection error:', error);
    }
}
dbConnection()
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});

app.use('/api', userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});