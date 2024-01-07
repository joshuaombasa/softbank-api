const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isParmanent: {type: String, default: false},
    languages: [String]
})


module.exports = employeeSchema
