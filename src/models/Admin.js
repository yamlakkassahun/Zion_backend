const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    salt: { 
        type: String, 
        required: true
    },
    firstName: { 
        type: String
    },
    lastName: { 
        type: String
    },
    address: { 
        type: String
    },
    phone: { 
        type: String, 
        required: true
    }
},{
    toJSON : {//this is to lite the response data
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            delete ret.salt
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;