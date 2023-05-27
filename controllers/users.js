const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// ID validation code from W06 Team Assignment Solution
// Other validation from what we did in the W06 Team Assignment

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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a user.');
    }
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to delete a user.');
    }
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