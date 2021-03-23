const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    key: String,
    ip: String,
});

module.exports = mongoose.model("userData", userSchema);