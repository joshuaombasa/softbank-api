const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {type: String},
    manager: {type: String}
})

module.exports = branchSchema
