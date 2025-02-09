
import { fetchFromTMDB } from "../services/tmdb.service.js";

// similar to moviecontroller.js fetches tv show trending, trailers, info, similar, categories.

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        //fetch trending movies array and select one randomly with Math.random() function
        res.json({success: true, content: randomMovie});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});
        
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
    res.json({success: true, content: data.results});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
      res.status(500).json({success: false, message: "Internal Server Error"});  
    }
}
    
export async function getTvDetails (req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
export async function getSimilarTvs(req,res){

const { id } = req.params;
try {
    const data =await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    res.status(200).json({success:true,similar:data.results});
} catch (error) {
    res.status(500).json({success:false,message:"Internal Server Error"});
}

}

export async function getTvsByCategory(req,res){
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
        