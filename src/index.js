const express = require('express');
const App = require('./services/ExpressApp.js');
const dbConnection = require('./services/Database');
const config = require('./config/index');

const StartServer = async () => {
    const app = express();
    //we use this kind of approach because we have to test our services this makes it easy
    await dbConnection();

    await App(app);

    app.listen( config.PORT, () => {
        console.log(`Listing on Port ${config.PORT}`);
    });
}

StartServer();