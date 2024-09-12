const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Plan', PlanSchema);
