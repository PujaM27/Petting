const express = require('express');
const router = express.Router();

const pets = {
    very_small: {
        low: [
            {
                name: "Lolly",
                breed: "Disneyy",
                age: "7 months",
                personality: "Calm and affectionate",
                image: "assets/images/kitt1.jpg",
                aiRecommendation: "Based on your preference for a very small, low-energy pet, Lolly would be perfect!"
            }
        ],
        moderate: [
            {
                name: "Fuzzy",
                breed: "Kingland",
                age: "3 months",
                personality: "Cute and playful",
                image: "assets/images/cat2.jpg",
                aiRecommendation: "Based on your preference for a very small, moderate-energy pet, Fuzzy would be perfect!"
            }
        ],
        high: [
            {
                name: "Sherry",
                breed: "Wonderland",
                age: "5 months",
                personality: "Playful and sweet",
                image: "assets/images/pupp1.jpg",
                aiRecommendation: "Based on your preference for a very small, high-energy pet, Sherry would be perfect!"
            }
        ]
    },
    small: {
        low: [
            {
                name: "Fluffy",
                breed: "Cutie",
                age: "11 months",
                personality: "Always does meow meow",
                image: "assets/images/cat1.jpg",
                aiRecommendation: "Based on your preference for a small, low-energy pet, Fluffy would be perfect!"
            }
        ],
        moderate: [
            {
                name: "Pookie",
                breed: "Homely vibes",
                age: "1 year",
                personality: "Very Sophisticated",
                image: "assets/images/cat2.jpg",
                aiRecommendation: "Based on your preference for a small, moderate-energy pet, Pookie would be perfect!"
            }
        ],
        high: [
            {
                name: "Cutie",
                breed: "Queen Beauty",
                age: "1 year",
                personality: "Calm and demure",
                image: "assets/images/cat3.jpg",
                aiRecommendation: "Based on your preference for a small, high-energy pet, Cutie would be perfect!"
            }
        ]
    },
    medium: {
        low: [
            {
                name: "Butter",
                breed: "Pure Indian",
                age: "2 years",
                personality: "Jolly and funny",
                image: "assets/images/dog1.jpg",
                aiRecommendation: "Based on your preference for a medium, low-energy pet, Butter would be perfect!"
            }
        ],
        moderate: [
            {
                name: "Musky",
                breed: "Huggable",
                age: "3 years",
                personality: "Cute and Introvert",
                image: "assets/images/dog2.jpg",
                aiRecommendation: "Based on your preference for a medium, moderate-energy pet, Musky would be perfect!"
            }
        ],
        high: [
            {
                name: "Toothsy",
                breed: "Happyland",
                age: "2 years",
                personality: "Very Very cutsie",
                image: "assets/images/dog3.jpg",
                aiRecommendation: "Based on your preference for a medium, high-energy pet, Toothsy would be perfect!"
            }
        ]
    }
};

router.post('/get_AIRecommendations', (req, res) => {
    try {
        console.log('Received AI recommendation request:', req.body);
        const { size, activity_level } = req.body;

        // Convert size to lowercase and replace all spaces with underscore
        const sizeKey = size.toLowerCase().replace(/\s+/g, '_');
        const activityKey = activity_level.toLowerCase();

        console.log('Looking for pets with:', { sizeKey, activityKey });
        console.log('Available sizes:', Object.keys(pets));
        console.log('Available activity levels for size:', sizeKey, pets[sizeKey] ? Object.keys(pets[sizeKey]) : 'none');

        // Validate if the keys exist
        if (!pets[sizeKey]) {
            console.log(`Size "${sizeKey}" not found in pets database`);
            return res.json({
                status: 'no_matches',
                recommendations: [],
                message: `No pets found for size: ${size}. Available sizes are: ${Object.keys(pets).join(', ')}`
            });
        }

        if (!pets[sizeKey][activityKey]) {
            console.log(`Activity level "${activityKey}" not found for size "${sizeKey}"`);
            return res.json({
                status: 'no_matches',
                recommendations: [],
                message: `No pets found for size: ${size} and activity level: ${activity_level}. Available activity levels are: ${Object.keys(pets[sizeKey]).join(', ')}`
            });
        }

        const matchingPets = pets[sizeKey][activityKey];
        console.log(`Found ${matchingPets.length} matching pets:`, matchingPets);

        res.json({
            status: 'success',
            recommendations: matchingPets
        });
    } catch (error) {
        console.error('Error in AI recommendations:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            error: error.message
        });
    }
});

module.exports = router; 