const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req,res) => {
    // #swagger.summary = 'Get All Users'
    const result = await mongodb.getDb().db('cse341-p02').collection('users').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const createUser = async (req,res) => {
    // #swagger.summary = 'Create a User'
    const user = {
        username: req.body.username,
        displayname: req.body.displayname,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        description: req.body.description
    };
    const result = await mongodb.getDb().db('cse341-p02').collection('users').insertOne(user);
    if(result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'An error occurred while creating the user');
    }
}

module.exports = {
    getAllUsers,
    createUser
};