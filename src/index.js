const express = require('express');
const App = require('./services/ExpressApp.js');
const dbConnection = require('./services/Database');


const StartServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    //we use this kind of approach because we have to test our services this makes it easy
    await dbConnection();

    await App(app);

    app.listen( port, () => {
        console.log(`Listing on Port ${port}`);
    });
}

StartServer();