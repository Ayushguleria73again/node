const express = require("express");
const joi = require("joi");
const model = require("../schema/model");
const bcrypt = require("bcrypt")
const signup = express.Router();

signup.post("/", async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        last: joi.string().required(),
        phone: joi.string().length(10).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(16).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    try {
        const existingUser = await model.findOne({
            $or: [{ phone: req.body.phone }, { email: req.body.email }]
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Phone number or email is already registered."
            });
        }
        const password = await bcrypt.hash(req.body.password,10)
        const newUser = new model({
            name: req.body.name,
            last: req.body.last,
            phone: req.body.phone,
            email: req.body.email,
            password:password
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: savedUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
            error: error.message
        });
    }
});

module.exports = signup;
