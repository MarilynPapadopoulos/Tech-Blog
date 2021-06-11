const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'title',
            'contents',
            'created_at'
        ]
    })
    .then(dbPostData => {
        //const post = dbPostData;
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn
         });
        
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })

});

router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
            //use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'contents',
            'created_at',
            
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        //serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

  
module.exports = router;