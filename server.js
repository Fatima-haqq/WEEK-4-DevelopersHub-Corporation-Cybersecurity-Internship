"use strict";

const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const session = require("express-session");
// const csrf = require('csurf');
const consolidate = require("consolidate"); // Templating library adapter for Express
const swig = require("swig");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit"); // Added for Rate Limiting
const cors = require("cors"); // Added for CORS
const MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
const http = require("http");
const marked = require("marked");
const logger = require("./logger");
//const nosniff = require('dont-sniff-mimetype');
const app = express(); // Web framework to handle routing requests

// API Key
const API_KEY = "my-secret-api-key";

const routes = require("./app/routes");
const { port, db, cookieSecret } = require("./config/config"); // Application config properties

/*
 // Fix for A6-Sensitive Data Exposure
 // Load keys for establishing secure HTTPS connection
 const fs = require("fs");
 const https = require("https");
 const path = require("path");
 const httpsOptions = {
     key: fs.readFileSync(path.resolve(__dirname, "./artifacts/cert/server.key")),
     cert: fs.readFileSync(path.resolve(__dirname, "./artifacts/cert/server.crt"))
 };
*/

MongoClient.connect(db, (err, db) => {
    if (err) {
        console.log("Error: DB: connect");
        console.log(err);
        process.exit(1);
    }

    logger.info("Connected to the database");
    console.log("Connected to the database");

    // Security Headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:"],
                },
            },

            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
        })
    );

    // Enable CORS
    app.use(cors({
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
        credentials: true
    }));

    // Apply Rate Limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5,
        message: "Too many requests. Please try again after 15 minutes."
    });

    app.use(limiter);

    // API Key Authentication Middleware
    app.use((req, res, next) => {

        // Skip API key check for login, signup, and static files
        if (
            req.path === "/login" ||
            req.path === "/signup" ||
            req.path.startsWith("/assets")
        ) {
            return next();
        }

        const apiKey = req.headers["x-api-key"];

        if (!apiKey || apiKey !== API_KEY) {
            return res.status(401).send("Unauthorized: Invalid API Key");
        }

        next();
    });

    // Hide Express information
    app.disable("x-powered-by");

    /*
    // Fix for A5 - Security MisConfig
    // TODO: Review the rest of helmet options, like "xssFilter"

    app.disable("x-powered-by");
    app.use(helmet.frameguard());
    app.use(helmet.noCache());
    app.use(helmet.contentSecurityPolicy());
    app.use(helmet.hsts());

    // app.use(helmet.xssFilter({ setOnOldIE: true }));
    // app.use(nosniff());
    */

    // Adding/Removing HTTP Headers for security
    app.use(favicon(__dirname + "/app/assets/favicon.ico"));

    // Express middleware to populate req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // Enable session management
    app.use(session({
        secret: cookieSecret,
        saveUninitialized: true,
        resave: true

        /*
        key: "sessionId",
        */

        /*
        cookie: {
            httpOnly: true
            // secure: true
        }
        */
    }));

    /*
    // Fix for A8 - CSRF
    app.use(csrf());

    app.use((req, res, next) => {
        res.locals.csrftoken = req.csrfToken();
        next();
    });
    */

    // Register templating engine
    app.engine(".html", consolidate.swig);
    app.set("view engine", "html");
    app.set("views", `${__dirname}/app/views`);

    // Static files
    app.use(express.static(`${__dirname}/app/assets`));

    // Configure Marked
    marked.setOptions({
        sanitize: true
    });

    app.locals.marked = marked;

    // Application routes
    routes(app, db);

    // Swig template settings
    swig.setDefaults({
        autoescape: false
        /*
        autoescape: true
        */
    });

    // Start HTTP Server
    http.createServer(app).listen(port, () => {
        logger.info(`Application started on port ${port}`);
        console.log(`Express http server listening on port ${port}`);
    });

    /*
    // HTTPS Server
    https.createServer(httpsOptions, app).listen(port, () => {
        console.log(`Express https server listening on port ${port}`);
    });
    */
});