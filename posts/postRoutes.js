const express = require('express');
const router = express.Router();
router.use(express.json());
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
    
        DB.findById(id)
            .then(db => {
                if (db.length !== 0) {
                    res.status(200).json(db)
                } else {
                    res.status(404).json({ message: 'user does not exist' })
                }
            })
            .catch(error => {
                res.status(404).json({ message: 'error retrieving user' })
            })
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

    if (blogPost.title || blogPost.contents) {
        DB.update(id, blogPost)
            .then(db => {
                res.status(200).json(db)
            })
            .catch(error => {
                res.status(500).json({ message: 'error updating blogpost' })
            })
    } else {
        res.status(400).json({ message: 'please provide title, or content' })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    DB.remove(id)
        .then(db => {
            if (db !== 0) {
                res.status(200).json(db)
            } else {
                res.status(404).json({ message: 'user does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving user' })
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    
    DB.findCommentById(id)
        .then(db => {
            if (db.length !== 0) {
                res.status(200).json(db)
            } else {
                res.status(404).json({ message: 'user does not exist' })
            }
        })
        .catch(error => {
            res.status(404).json({ message: 'error retrieving user' })
        })
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    console.log('id', id);
    console.log('comment', comment);
        if(comment.text && comment.text !=="") {
            DB.insertComment(comment)
                .then(db => {
                    console.log('db', db)
                    if (db.length !== 0) {
                        res.status(200).json(db)
                    } else {
                        res.status(404).json({ message: 'user does not exist' })
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    res.status(500).json({ message: 'error retrieving user' })
                })
        }
})


module.exports = router;