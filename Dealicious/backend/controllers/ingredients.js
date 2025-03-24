require('dotenv').config();

const express = require("express");
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

const router = express.Router();

const apiKey = process.env.SPOONACULAR_API_KEY;
const JSON_FILE_PATH = "./data/data.json";

const getIngredients = asyncHandler(async (req) => {
    const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf8");
    const ingredients = JSON.parse(jsonData);

    const selectedIngredients = [];
    const ingredientCount = ingredients.ingredients.length;
    const selectedIndices = new Set();

    while (selectedIndices.size < 30) {
        const randomIndex = Math.floor(Math.random() * ingredientCount);
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            selectedIngredients.push(ingredients.ingredients[randomIndex]);
        }
    }
    return selectedIngredients;
});

// Used to get ingredient images, only used once
const getIngredientImages = asyncHandler(async (req, res) => {
    const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf8");
    const ingredients = JSON.parse(jsonData);

    for (const ingredient of ingredients.ingredients) {
        try {
            const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search`, {
                params: {
                    query: ingredient.name,
                    apiKey: apiKey
                }
            });

            if (response.data.results.length > 0) {
                const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${response.data.results[0].image}`;
                ingredient.image = imageUrl;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(`Error fetching image for ingredient ${ingredient.name}:`, error.message);
        }
    }

    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(ingredients, null, 2), "utf8");
    res.json({ message: "Ingredient images updated successfully" });
});

router.get("/", async (req, res) => {
    try {
        const ingredients = await getIngredients();
        res.json(ingredients);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//router.get("/update-images", getIngredientImages);

module.exports = { router, getIngredients };