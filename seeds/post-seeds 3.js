const { Post } = require('../models');

const postData = [
    {
        title: "Test Title",
        contents: "Test test test test test test test test test test test test test test test.",
        user_id: 1
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost; 