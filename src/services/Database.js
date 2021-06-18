const mongoose = require('mongoose');

const database = async () => {
//this is the database service 
    try {
        await mongoose.connect( 'mongodb://localhost:27017/gebya', {
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