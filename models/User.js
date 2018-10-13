const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  dishType: {
    type: String
  },
  name: {
    type: String
  },
  ingredients: {
    type: Array
  },  // []
  directions: {
    type: Array
  },
  upvotes: {
    type: Number
  },
  downvotes: {
    type: Number
  }
});

const MealSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  recipes: [RecipeSchema]
});

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
    members: Array,
    meals: [MealSchema]
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    slogan: {
      type: String
    },
    parties: [PartySchema]
});

const User = mongoose.model('users', UserSchema);
const Party = mongoose.model('party', PartySchema);
const Meal = mongoose.model('meal', MealSchema);
const Recipe = mongoose.model('recipe', RecipeSchema);

// //
module.exports = {
  User: User,
  Party: Party,
  Meal: Meal,
  Recipe: Recipe
};
// module.exports = Party;

// module.exports = {
//   User: mongoose.model('users', UserSchema)
//   // Party: mongoose.model('Party', PartySchema),
//   // Meal: mongoose.model('Meal', MealSchema),
//   // Recipe: mongoose.model('Recipe', RecipeSchema)
// };
