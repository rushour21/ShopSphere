import express from "express"
import "dotenv/config"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(userRoutes) 

app.get('/', (req,res) => {
    return res.send("hi hello")
}) 
app.listen(PORT, ()=>{ 
    console.log(`server is running on PORT ${PORT}`);
})   