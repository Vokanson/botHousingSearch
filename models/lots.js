const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lotSchema = new Schema({
    title: String,
    price: Number,
});

const Lot = mongoose.model('Lot', lotSchema);
module.exports = Lot;