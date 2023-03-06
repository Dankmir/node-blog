const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String, 
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// First argument should be singular of collection name, becauase it automatically pluralises it when searching for collection in DB
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;