const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
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

const updateUser = async (req, res) => {
    // #swagger.summary = 'Update a User'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        displayname: req.body.displayname,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        description: req.body.description
    };
    const result = await mongodb.getDb().db('cse341-p02').collection('users').replaceOne({_id: userId}, user);
    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating the user');
    }
}

const deleteUser = async (req, res) => {
    // #swagger.summary = 'Delete a User'
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-p02').collection('users').deleteOne({_id: userId});
    if(result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting the user');
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};