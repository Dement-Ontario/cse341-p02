const dotenv = require('dotenv');
dotenv.config();
const mongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.keg95g5.mongodb.net/?retryWrites=true&w=majority`;

// mongoClient and all code below from
// https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
// (It didn't seem like there was much I could do otherwise),
// db folder idea from solution

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    mongoClient .connect(uri)
        .then(client => {
        _db = client;
        callback(null, _db);
        })
        .catch(err => {
        callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};
