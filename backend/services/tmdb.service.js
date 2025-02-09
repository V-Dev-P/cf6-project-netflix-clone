import axios from "axios"; 
import { ENV_VARS } from "../config/envVars.js"; 
export const fetchFromTMDB = async (url) => {
   
    const options = {
        headers: {
            accept: 'application/json', // response in JSON format
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY //  TMDB API key from the environment variables
        }
    };
    
    const response = await axios.get(url, options);
    
    if (response.status !== 200) {
        console.log(response.data); 
        throw new Error("Failed to fetch data from TMDB: " + response.statusText);
    }
    
    return response.data;
};
