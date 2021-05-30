const { Comment } = require('../models');

const commentData = [
    {
        comment: 'Great Post!',
        user_id: 1
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment; 