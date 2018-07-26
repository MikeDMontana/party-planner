const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now },
  parties: [PartySchema]
});

var PartySchema = mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  meals: [MealSchema],
});

var MealSchema = mongoose.Schema({
  title: String,
  description: String,
  recipes: [RecipeSchema]
});

var RecipeSchema = mongoose.Schema({
  dishType: String,
  name: String,
  ingredients: [],
  directions: [],
  upvotes: Number,
  downvotes: Number
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Party: mongoose.model('Party', PartySchema),
  Meal: mongoose.model('Meal', MealSchema),
  Recipe: mongoose.model('Recipe', RecipeSchema)
};
