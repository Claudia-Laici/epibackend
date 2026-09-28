import express from "express"
import postsController from "../controllers/posts.js"

const PostsRouter = express.Router()

PostsRouter.get('/', postsController.findAll)
PostsRouter.get('/posts/:postId', postsController.findOne)

PostsRouter.post('/posts/create', postsController.create)

PostsRouter.patch('/posts/:postsId/update', postsController.updatePost)

export default PostsRouter