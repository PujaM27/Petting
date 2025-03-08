const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


//Basic CORs setup
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Import AI recommendations router
const aiRecommendationsRouter = require('./ai-recommendations');
app.use('/', aiRecommendationsRouter);

// Handle 404s
app.use((req, res) => {
    console.log('404 for:', req.url);
    res.status(404).send('Page not found');
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
