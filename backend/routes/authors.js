import express from "express";
import {
  createAuthors,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  getAuthorBlogPosts,
  uploadAvatar,
} from "../controllers/authors.js";
import uploadImg from "../middlewares/cloudinary.js";

const AuthorRouter = express.Router();

AuthorRouter.get("/", getAllAuthors);

AuthorRouter.get("/:id", getAuthorById);

AuthorRouter.get("/:id/blogPosts", getAuthorBlogPosts);

AuthorRouter.post("/", createAuthors);

AuthorRouter.put("/:id", updateAuthor);

AuthorRouter.delete("/:id", deleteAuthor);

AuthorRouter.patch("/:id/avatar", uploadImg.single("avatar"), uploadAvatar);

export default AuthorRouter;
