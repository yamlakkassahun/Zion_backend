const mongoose = require('mongoose');
const config = require('../config/index');

const database = async () => {
//this is the database service 
    try {
        await mongoose.connect( config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    
        console.log('Db Connected');
    }
    catch (e) {
        console.log('error: '+e)
    }
}

module.exports = database;