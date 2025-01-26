import express from "express";
import connectDB from "./config/db";
import errorHandler from "./utils/errorHandler";
import { authenticateJWT } from "./utils/AuthToken";
import AuthRoutes from "./Auth/AuthRoutes";
import userRoutes from "./users/userRoutes";
import postRoutes from "./post/postRoutes";
import upload from "./utils/uploadImageConfig";
import path from "path";
import cors from "cors";


connectDB();

const app = express();
app.use(express.json());


const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};


app.use(cors(corsOptions));


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.get("/ping", (_req, res) => {
//     res.send("pong");
//   });
app.use("/api/auth", AuthRoutes);
app.use("/api/user", authenticateJWT, userRoutes);
app.use("/api/post", authenticateJWT, upload.single("image"), postRoutes);

app.use(errorHandler);

export default app;
