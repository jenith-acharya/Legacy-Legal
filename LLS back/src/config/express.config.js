const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
app.use(express.json());


require('./db.config')

const router = require('./router.config');

// Use middlewares properly
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 

app.use(router);

app.use((req, res, next) => {
    next({
        statusCode: 404,
        message: "404 resources not found",
        detail: null
    });
});

app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';
    let error = err.detail || null;

    if (err.code === 11000) {
        console.log('Validation error at MongoDB');
        const uniquefieldKeys = Object.keys(err.keyPattern);
        console.log(uniquefieldKeys);
        let details = {};
        details[uniquefieldKeys] = uniquefieldKeys.map(key => `${key} must be unique`).join(',');
        message = 'Validation error';
        statusCode = 400;
        error = details;
    }

    console.log("Error handling middleware:", err);

    res.status(statusCode).json({
        result: error,
        message: message,
        meta: null
    });
});

module.exports = app;
