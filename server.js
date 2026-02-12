import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { userRoutes } from './APIs/UserApi.js';
import { authorRoutes } from './APIs/AuthorApi.js';
import { adminRoutes } from './APIs/AdminApi.js';
import { commonRouter } from './APIs/common-Api.js';
import CookieParser from 'cookie-parser';
import { authenticate } from './services/AuthServices.js';
config();
const app = exp();//for creating server
app.use(exp.json());//to parse the incoming json data
app.use(CookieParser());//to parse the cookies from the incoming request
//register routes here
app.use("/user-api", userRoutes);
app.use("/author-api", authorRoutes);
app.use("/admin-api", adminRoutes);
app.use("/common-api", commonRouter);
//
//it is used to connect to the database and start the server
async function connectDB() {
    try {
        await connect(process.env.DB_URL);
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT, () => {
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.log("DB Error:", err);
    }
}
connectDB();

// Invalid path middleware (keep this LAST)
app.use((req,res,next)=>{
    res.status(404).json({message:`${req.url} invalid path`})
});

// Error middleware
app.use((err, req, res, next) => {
    res.status(500).json({message:"Something went wrong!", reason: err.message});
});