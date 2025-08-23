import express from "express"
import cookieParser from "cookie-parser";
import "dotenv/config"
import authRoute from "./routes/authRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import dashboardRoute from "./routes/DashboardRouter.js"
import userRoute from "./routes/userRoutes.js"
import storeRoute from "./routes/storeRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cookieParser());

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