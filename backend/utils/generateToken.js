import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});
    // The jwt.sign() method takes in three arguments: the payload, the secret key, and the options object.
    // The payload is an object that contains the data you want to encode in the token.
    // The secret key is a string that is used to sign the token.

    res.cookie ("jwt-netflix",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, // format of 15 days must be in miliseconds
        httpOnly: true, // cookie is only accessible by a browser not accessible by javascript, prevents xss attacks
        sameSite:"strict", //csrf protection
        secure:ENV_VARS.NODE_ENV !== "development" //cookie will only be sent over https in production

    });

   return token; 

};