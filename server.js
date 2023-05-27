const express = require('express');
const dotenv = require("dotenv");
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

dotenv.config();
const port = process.env.port || 3000;
const app = express();

// Most code as of 20/5/23 repurposed from contacts project

app
    .use(cors())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb ) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
    }
    });
console.log('Web Server is listening at port '+ (port));