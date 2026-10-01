import express from "express"
import postsController from "../controllers/posts.js"

const PostsRouter = express.Router()

PostsRouter.get("/", postsController.findAll)
PostsRouter.get("/:postId", postsController.findOne)

PostsRouter.post("/", postsController.create)

PostsRouter.patch("/:postId", postsController.updatePost)

PostsRouter.delete("/:postId", postsController.deletePost)

export default PostsRouter