import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";
import cors from "cors";
import "dotenv/config";

import AuthorRouter from "./routes/authors.js";
import PostsRouter from "./routes/posts.js";
import CommentsRouter from "./routes/comments.js";
import AuthRouter from "./routes/auth.js"
import { auth } from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import { createAuthors } from "./controllers/authors.js";
import passport from "passport";
import googleStrategy from "./strategies/google.js";

dns.setServers(["8.8.8.8"]);

const server = express();
server.use(cors());

server.use(express.json());

passport.use(googleStrategy)

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connesso a MongoDB");
} catch (error) {
    console.error("Errore connessione MongoDB:", error);
}

server.get("/", (req, res) => {
    res.status(200).json({
        message: "Benvenuto nel server epicode!"
    });
});

server.use("/auth", AuthRouter)
server.post("/authors", createAuthors);
server.use(auth)
server.use("/authors", AuthorRouter);
server.use("/posts", PostsRouter);
server.use("/blogPosts", PostsRouter);
server.use("/blogPosts", CommentsRouter);

server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server up and running on port ${process.env.PORT}`);
});