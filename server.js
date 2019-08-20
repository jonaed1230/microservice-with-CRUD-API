const express = require('@feathersjs/express');
const bodyParser = require('body-parser');
const service = require('./broker');

// create feathers express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Use ApiGateway as middleware


app.use("/", service.express());

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3000");
});