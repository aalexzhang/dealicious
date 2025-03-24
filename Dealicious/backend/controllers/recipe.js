require('dotenv').config();

const express = require("express");
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

const router = express.Router();

const apiKey = process.env.SPOONACULAR_API_KEY;
const JSON_FILE_PATH = "./data/recipes.json";

const getRecipes = asyncHandler(async (req) => {
    const {
        nutrition = "balanced",
        cuisine = "any",
        minFiber = "0",
        maxCarb = "100",
        minProtein = "0",
    } = req.query || {};

    try {

        //throw new Error("Simulated error for testing");

        const days = 7;
        const recipes = [];

        for (let i = 0; i < days; i++) {
            const [breakfastResponse, mainCourseResponse] = await Promise.all([
                axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                    params: {
                        apiKey: apiKey,
                        number: 1,
                        diet: nutrition,
                        cuisine: cuisine,
                        type: "breakfast",
                        sort: "random",
                        minFiber: minFiber,
                        maxCarbs: maxCarb,
                        minProtein: minProtein,
                        addRecipeInstructions: true,
                        addRecipeInformation: true
                    }
                }),
                axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                    params: {
                        apiKey: apiKey,
                        number: 2,
                        diet: nutrition,
                        cuisine: cuisine,
                        type: "main course",
                        sort: "random",
                        minFiber: minFiber,
                        maxCarbs: maxCarb,
                        minProtein: minProtein,
                        addRecipeInstructions: true,
                        addRecipeInformation: true
                    }
                })
            ]);

            recipes.push({
                day: i + 1,
                breakfast: breakfastResponse.data.results[0] || null,
                lunch: mainCourseResponse.data.results[0] || null,
                dinner: mainCourseResponse.data.results[1] || null
            });
        }

        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(recipes, null, 2));
        console.log("Recipes fetched and saved to file");
    } catch (error) {
        console.error("Error fetching recipes:", error.message);
        //throw new Error("Failed to fetch recipes");
    }
});

router.get("/update", async (req, res) => {
    try {
        console.log(req.query)
        await getRecipes(req);

        const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf8");
        res.json(JSON.parse(jsonData));
    } catch (error) {
        res.status(500).json({ error: "Error retrieving recipes", message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf8");
        res.json(JSON.parse(jsonData));
    } catch (error) {
        res.status(500).json({ error: "Error retrieving recipes", message: error.message });
    }
});

module.exports = { router, getRecipes };