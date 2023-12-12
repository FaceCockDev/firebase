const express = require('express');
const app = express();

/*
const router = express.Router();
const myMiddleware = (req, res, next) => {
    console.log('Middleware executed!');
    next();
};

 */

// Using the middleware with router.use
//router.use(myMiddleware);

// Import route handlers from other files
const { memberController } = require('./member/member-controller');

// Use nested routes
app.use('/member/api/v1', memberController);

// Remove the empty app.use() statement
// app.use();

// Export the Express app
module.exports = app;