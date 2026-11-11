// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Middleware to read JSON data
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the public folder
app.use("/site", express.static(path.join(__dirname, "public")));

// GET route: Home page
app.get("/", (req, res) => {
    res.send("My Week 2 API!");
});

// POST route: Create a user greeting
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    // Validate the submitted information
    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.json({
        message: `Hello, ${name}!`,
        email: email
    });
});

// GET route: Retrieve a user profile
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    res.json({
        message: `User ${userId} profile`
    });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid JSON format"
        });
    }

    next(err);
});

// Handle other errors
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: "Something went wrong on the server"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
