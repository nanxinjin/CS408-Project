var cryptojs = require('crypto-js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
    token: { type: String, required: true },
    tokenHash: { type: String }
});

TokenSchema.pre('save', function(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('token')) return next();

    var hash = cryptojs.MD5(this.token).toString();
    this.tokenHash = hash
    next();
});

module.exports = mongoose.model('Token', TokenSchema);
