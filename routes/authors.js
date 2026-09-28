import express from "express"
import { createAuthors, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/authors.js"

const AuthorRouter = express.Router()

AuthorRouter.get("/", getAllAuthors)

AuthorRouter.post("/", createAuthors)

AuthorRouter.get("/:id", getAuthorById)

AuthorRouter.put("/:id", updateAuthor)

AuthorRouter.delete("/:id", deleteAuthor)


export default AuthorRouter