const router = require('express').Router();
const { Comment } = require('../../models');

// api/comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment',
            'created_at'
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Comment.create({
        comment: req.body.comment,
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//delete comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'This comment does not exist.' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;