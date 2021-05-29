const router = require('express').Router();

const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'title',
            'content'
        ]
    })
    res.render('homepage')
});

module.exports = router;