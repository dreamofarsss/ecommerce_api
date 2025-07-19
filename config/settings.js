require('dotenv').config();

const settings = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI
}

module.exports = settings
