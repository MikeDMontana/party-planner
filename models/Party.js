const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartySchema = new Schema({
    partyTitle: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    partyDescription: {
      type: String
    },
    members: {
      type: Array
    }
    // meals: [MealSchema]
});

module.exports = PartySchema;
