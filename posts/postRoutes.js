const express = require('express');
const router = express.Router();
const DB = require('../data/db');

router.get('/', (req, res) => {
    DB.find()
        .then(db => {
            res.status(200).json(db)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving list of users' })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if (id) {
        DB.findById(id)
        .then(db => {
            res.status(200).json(db)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving user' })
        })
    } else {
        res.status(400).json({ message: 'user does not exist' })
    }
    
})

router.post('/', (req, res) => {
    const blogPost = req.body;

    if (blogPost.title && blogPost.contents) {
        DB.insert(blogPost)
            .then(db => {
                res.status(200).json(db)
            })
            .catch(error => {
                res.status(500).json({ message: 'error making blogpost' })
            })
    } else {
        res.status(400).json({ message: 'please provide title, and content' })
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const blogPost = req.body;

    if (blogPost.title && blogPost.contents) {
        DB.update(id, blogPost)
            .then(db => {
                res.status(200).json(db)
            })
            .catch(error => {
                res.status(500).json({ message: 'error updating blogpost' })
            })
    } else {
        res.status(400).json({ message: 'please provide title, and content' })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (id) {
        DB.remove(id)
            .then(db => {
                res.status(200).json(db)
            })
            .catch(error => {
                res.status(500).json({ message: 'error deleting user' })
            })
    } else {
        res.status(400).json({ message: 'user does not exist' })
    }
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    
    if (id) {
        DB.findCommentById(id)
            .then(db => {
                res.status(200).json(db)
            })
            .catch(error => {
                res.status(500).json({ message: 'error retrieving comments' })
            })
    } else {
        res.status(400).json({ message: 'user does not exist' })
    }
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const comment = req.body;

    if (id) {
        if (comment.text && comment.text !== "") {
            DB.insertComment(comment)
            .then(db => {
                res.status(200).json(db)
            })
            .catch(error => {
                res.status(200).json({ message: 'error posting comment' })
            })
        } else {
            res.status(400).json({ message: 'please provide a comment' })
        }
    } else {
        res.status(400).json({ message: 'user does not exist' })
    }
})


module.exports = router;