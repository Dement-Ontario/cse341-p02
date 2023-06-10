const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAllPosts = async (req,res) => {
    // #swagger.summary = 'Get All Posts'
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').find();
    try {
        lists = await result.toArray();
        if (!lists.length > 0) {
            throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch(error) {
        res.status(400).json(error.message || 'an error happened while getting posts');
    }
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
    try {
        lists = await result.toArray();
        if (!lists.length > 0) {
            throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch(error) {
        res.status(400).json(error.message || "an error happened while getting user's posts");
    }
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
    try {
        lists = await result.toArray();
        if (!lists.length > 0) {
            throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch(error) {
        res.status(400).json(error.message || 'an error happened while getting post');
    }
};

const createPost = async (req,res) => {
    // #swagger.summary = 'Create a Post'
    if (!ObjectId.isValid(req.body.userid)) {
        res.status(400).json('Must use a valid user id to create a post.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const post = {
        heading: req.body.heading,
        postcontent: req.body.postcontent,
        userid: new ObjectId(req.body.userid)
    };
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').insertOne(post);
    if(result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'An error occurred while creating the post');
    }
}

const editPost = async (req, res) => {
    // #swagger.summary = 'Edit a Post'
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid post id to update a post.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const postId = new ObjectId(req.params.id);
    const post = {
        heading: req.body.heading,
        postcontent: req.body.postcontent
    };
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').updateOne({_id: postId}, {$set: post});
    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating the post');
    }
}

const deletePost = async (req, res) => {
    // #swagger.summary = 'Delete a Post'
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid post id to delete a post.');
    }
    const postId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-p02').collection('posts').deleteOne({_id: postId});
    if(result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting the post');
    }
}

module.exports = {
    getAllPosts,
    getOnePost,
    getUserPosts,
    createPost,
    editPost,
    deletePost
};