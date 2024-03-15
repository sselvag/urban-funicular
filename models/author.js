const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    listOfBooks: {
        type: Array,
        required: true
    },
    briefBiography: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)