const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAllPosts = async (req,res) => {
    // #swagger.summary = 'Get All Posts'
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const getUserPosts = async (req,res) => {
    // #swagger.summary = 'Get All Posts by One User'
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find their posts.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').find({userid: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getOnePost = async (req,res) => {
    // #swagger.summary = 'Get One Post'
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid post id to find a post.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const postId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').find({_id: postId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = {
    getAllPosts,
    getOnePost,
    getUserPosts
};