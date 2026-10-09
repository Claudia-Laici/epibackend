import commentsService from "../services/comments.js";
import postService from "../services/posts.js";

const findAllComments = async (request, response) => {
  const { id } = request.params;

  try {
    const post = await postService.findOne(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    const comments = await commentsService.findAllComments(id);

    return response.status(200).send({
      statusCode: 200,
      comments,
    });
  } catch (e) {
    console.log(e);

    return response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const findOneComment = async (request, response) => {
  const { id, commentId } = request.params;

  try {
    const post = await postService.findOne(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "No post found with the given ID",
      });
    }

    const comment = await commentsService.findOneComment(id, commentId);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "No comments found with the given ID",
      });
    }

    return response.status(200).send({
      statusCode: 200,
      comment,
    });
  } catch (e) {
    console.log(e);

    return response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createComment = async (request, response) => {
  const { id } = request.params;

  try {
    const post = await postService.findOne(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    const comment = await commentsService.createComment(id, request.body);

    return response.status(201).send({
      statusCode: 201,
      comment,
    });
  } catch (e) {
    console.log(e);

    return response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateComment = async (request, response) => {
  const { id, commentId } = request.params;
  const { body } = request;

  try {
    const post = await postService.findOne(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    const comment = await commentsService.updateComment(id, commentId, body);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }

    return response.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      comment,
    });
  } catch (e) {
    console.log(e);

    return response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteComment = async (request, response) => {
  const { id, commentId } = request.params;

  try {
    const post = await postService.findOne(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    const comment = await commentsService.deleteComment(id, commentId);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }

    return response.status(200).send({
      statusCode: 200,
      message: `Comment with id ${commentId} deleted successfully`,
      comment,
    });
  } catch (e) {
    console.log(e);

    return response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export default {
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
};
