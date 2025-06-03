import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())

app.use('/users', userRouter);
app.use('/status', (req, res) => {
     res.send('ok');
});

app.listen(process.env.PORT, () => console.log(`Server Running On ${process.env.PORT}`));