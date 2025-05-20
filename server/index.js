import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const PORT = 3000 || process.env.PORT

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.get("/", (req, res) => {
    res.send("API working")
})

app.use("/api/blogs", blogRouter);
app.use("/api/users",userRouter)

app.listen(PORT, () => {
    console.log("Serving is running at port", PORT)
})
