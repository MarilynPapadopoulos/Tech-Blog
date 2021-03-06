const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create the Post model
class Post extends Model {}

//define table columns and configuration

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        freeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;