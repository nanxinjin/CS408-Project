var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarketSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    price: { type: Number },
    contact: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Number }
});

module.exports = mongoose.model('Market', MarketSchema);
