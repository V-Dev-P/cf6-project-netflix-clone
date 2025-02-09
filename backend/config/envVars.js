import dotenv from 'dotenv';

dotenv.config(); //load environmental variables

export const ENV_VARS = {
    PORT: process.env.PORT, //port number of server
    MONGO_URI: process.env.MONGO_URI, //mongodb connection uri
    JWT_SECRET: process.env.JWT_SECRET, //secret key json web tokens
    NODE_ENV: process.env.NODE_ENV, //environment of application is running
    TMDB_API_KEY: process.env.TMDB_API_KEY, //api key for TMDB Movies Database

};