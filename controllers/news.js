import axios from "axios";
export const articleController = async(req,res) => {
    try {
        const {sortBy,querry,from,to,}=req.params;
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${querry}}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=467644902f224dbc96571ff90a423677`)
    return res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
}