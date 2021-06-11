const { User } = require('../models');

const userData = [
    {
        username: 'paul',
        password: 'password'
    }
];
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;