import express from "express";
import uploadImg from "../middlewares/cloudinary.js";
import postsController from "../controllers/posts.js";

const PostsRouter = express.Router();

PostsRouter.get("/", postsController.findAll);
PostsRouter.get("/:postId", postsController.findOne);

PostsRouter.post("/", postsController.create);

PostsRouter.patch("/:postId", postsController.updatePost);
PostsRouter.patch("/:postId/cover", uploadImg.single("cover"),postsController.uploadCover,
);

PostsRouter.delete("/posts/:postId", postsController.deletePost);

export default PostsRouter;
