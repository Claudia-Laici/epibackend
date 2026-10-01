import express from "express"
import { createAuthors, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor, getAuthorBlogPosts } from "../controllers/authors.js"

const AuthorRouter = express.Router()

AuthorRouter.get("/", getAllAuthors)

AuthorRouter.get("/:id", getAuthorById)

AuthorRouter.get("/:id/blogPosts", getAuthorBlogPosts)

AuthorRouter.post("/", createAuthors)

AuthorRouter.put("/:id", updateAuthor)

AuthorRouter.delete("/:id", deleteAuthor)


export default AuthorRouter