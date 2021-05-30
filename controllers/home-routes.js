const router = require('express').Router();

const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'title',
            'contents'
        ]
    })
    .then(dbPostData => {
        //const post = dbPostData;
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts, 
         });
        
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })

});
  
module.exports = router;