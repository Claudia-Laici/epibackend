import express from "express";
import commentsController from "../controllers/comments.js";

const CommentsRouter = express.Router();

CommentsRouter.get("/:id/comments", commentsController.findAllComments);

CommentsRouter.get(
  "/:id/comments/:commentId",
  commentsController.findOneComment,
);

CommentsRouter.post("/:id", commentsController.createComment);

CommentsRouter.put("/:id/comment/:commentId", commentsController.updateComment);

CommentsRouter.delete(
  "/:id/comment/:commentId",
  commentsController.deleteComment
);

export default CommentsRouter;
