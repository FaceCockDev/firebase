const express = require('express');
const app = express();

// Import route handlers from other files
const { memberController } = require('./member/member-controller');
const { operationController } = require('./operation/operation-controller');

// Use nested routes
app.use('/member/v1', memberController);
app.use('/operation/v1', operationController);

module.exports = app;