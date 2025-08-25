import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config"
import authRoute from "./routes/authRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import dashboardRoute from "./routes/DashboardRouter.js"
import userRoute from "./routes/userRoutes.js"
import storeRoute from "./routes/storeRoutes.js"

const app = express()
app.use(cors({
  origin: ["https://shop-sphere-pied.vercel.app", "http://localhost:5173"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000; 

app.use(authRoute);
app.use(adminRoute); 
app.use(dashboardRoute); 
app.use(userRoute); 
app.use(storeRoute); 


app.get('/', (req,res) => {
    return res.send("hi hello")
}) 
app.listen(PORT, ()=>{ 
    console.log(`server is running on PORT ${PORT}`);
})   