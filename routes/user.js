const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const models = require('../models/User');

const app = express();

// configure app to use BodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow CORS and Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// =====================================================
// find user by ID
// then update user with party sent to route

router.route('/:user_id/newParty')

  .get(function(req, res) {
    models.User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

        res.json(user);
    });
  })

  .put(function(req, res) {
    models.User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

        let party = new models.Party({
          partyTitle: req.body.partyTitle,
          date: req.body.date,
          partyDescription: req.body.partyDescription,
          members: req.body.members,
          meals: []
        });

        let newestParty = user.parties.length;

        user.parties.push(party);
        user.save(function(err) {
          if (err)
            res.send(err);

            res.json(user.parties[newestParty]);
        });
    });
  });

// ===================================================

// GET specific party
router.route('/:user_id/parties/:party_id')
  .get(function(req, res) {
    models.User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

        res.json(user.parties.id(req.params.party_id));
    });
  })

  .put(function(req, res) {
    models.User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

        let meal = new models.Meal({
          mealTitle: req.body.mealTitle,
          mealDescription: req.body.mealDescription,
          recipes: []
        });

        user.parties.id(req.params.party_id).meals.push(meal);
        user.save(function(err) {
          if (err)
            res.send(err);

            // res.json(user);
            res.json(user);
        });
    });
  })

// END of GET Specific Party Route

// GET specific recipe that is already saved
router.route('/:user_id/parties/:party_id/meals/:meal_id/recipes/:recipe/view')
  .get(function(req, res) {
    models.User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

        res.json(user.parties.id(req.params.party_id).meals.id(req.params.meal_id).recipes);
    });
  })

  .put(function(req, res) {
    models.User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

        let newRecipe = new models.Recipe({
          recipeType: req.body.recipeType,
          recipeName: req.body.recipeName,
          ingredients: req.body.ingredients,
          recipeDirections: req.body.recipeDirections,
          upvotes: req.body.upvotes,
          downvotes: req.body.downvotes
        });

        user.parties.id(req.params.party_id).meals.id(req.params.meal_id).recipes.push(newRecipe);
        user.save(function(err) {
          if (err)
            res.send(err);

            // res.json(user);
            res.json(user);
        });
    });
  })

// END of GET Specific Recipe Route

// pipe the recipe search Request through proxy server
// and deliver the response
router.route('/:user_id/parties/:party_id/meals/:meal_id/recipes/:recipeSearch')

  .get(function(req, res) {
    let url = 'https://api.edamam.com/search?q=' + req.params.recipeSearch + '&app_id=5cd694d0&app_key=f2f0600b33f16711a3873d9b67cc882f&from=0&to=12&calories=591-722&health=alcohol-free';
    req.pipe(request(url)).pipe(res);
  });
  // end of proxy recipe search

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    models.User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const newUser = new models.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                slogan: req.body.slogan
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  models.User.findOne({email})
    .then(user => {
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              slogan: user.slogan,
              parties: user.parties
            }
            jwt.sign(payload, 'secret', {
              expiresIn: 3600
            }, (err, token) => {
              if(err) console.error('There is some error in token', err);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            });
          }
          else {
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
          }
        });
    });
});


module.exports = router;
