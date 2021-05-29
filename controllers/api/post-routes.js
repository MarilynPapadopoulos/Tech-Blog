const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


// api/posts

router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'contents',
            'user_id' 
        ]        
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get one post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'contents',
            'user_id'
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
        ],
        include: {
            model: User,
            attributes: ['username']
        }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//create post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete post
router.delete('/:id', (req, res) => {
    Post.destroy ({
        where: {
           id: req.params.id
       }
    })
   .then(dbPostData => {
       if(!dbPostData) {
           res.status(400).json({ message: 'This blog post does not exist' });
           return;
       }
       res.json(dbPostData);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

module.exports = router;