const Admin = require("../models/Admin");
const express = require("express");
const { GenerateSalt, GeneratePassword, GenerateSignature, ValidatePassword } = require("../utility/passwordUtility")

module.exports.AdminSignUp = async (req, res, next) => {
    try {
        const { email, phone, password, address, firstName, lastName } = req.body;
        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(password, salt);
        const existingAdmin = await Admin.findOne({ email: email });

        if (existingAdmin !== null) {
            return res.status(400).json({ message: 'Admin with the same email already exists' });
        }
        const result = await Admin.create({
            email: email,
            password: userPassword,
            phone: phone,
            salt: salt,
            firstName: firstName,
            lastName: lastName,
            address: address
        });
        if (result) {
            //generate the signature
            const signature = GenerateSignature({
                _id: result._id,
                email: result.email
            });
            //send the result to client
            return res.status(201).json({ signature: signature,  status: 'success' });
        }
    } catch (error) {
        return next(error);
    }
}


module.exports.AdminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const adminUser = await Admin.findOne({ email: email });
        if (adminUser) {
            const validation = await ValidatePassword(password, adminUser.password, adminUser.salt);
            if (validation) {
                //generate the signature
                const signature = GenerateSignature({
                    _id: adminUser._id,
                    email: adminUser.email
                });
                //send the result to client
                return res.status(201).json({
                    signature: signature,
                    status: 'success'
                });
            }
        }
        return res.json({ message: 'Login credential not Valid' });
    } catch (error) {
        return next(error);
    }
}