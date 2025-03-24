const express = require('express')
var router = new express.Router()

const recipeRouter = require('./controllers/recipe.js')


router.use('/recipe', recipeRouter)

module.exports = router;