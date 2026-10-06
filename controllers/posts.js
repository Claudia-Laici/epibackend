import { request, response } from "express";
import postService from "../services/posts.js";
import mongoose from "mongoose";
import Posts from "../modules/posts/Post.js";

const findAll = async (request, response) => {
  const { page = 1, pageSize = 10, title } = request.query;

  try {
    if (title) {
      const posts = await postService.filterBlog(title);

      if (posts.length === 0) {
        return response.status(404).send({
          statusCode: 404,
          message: "No posts found",
        });
      }

      return response.status(200).send({
        statusCode: 200,
        posts,
      });
    }

    const { totalPosts, totalPages, items } = await postService.findAll(
      page,
      pageSize,
    );

    if (items.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "No posts found",
      });
    }

    response.status(200).send({
      statusCode: 200,
      totalPages,
      totalPosts,
      page: Number(page),
      pageSize: Number(pageSize),
      items,
    });
  } catch (e) {
    console.log(e);

    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const findOne = async (request, response) => {
  const { postId } = request.params;

  try {
    const post = await postService.findOne(postId);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "No post found with the given ID",
      });
    }

    response.status(200).send({
      statusCode: 200,
      post,
    });
  } catch (e) {
    console.log(e);

    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const create = async (request, response) => {
  try {
    const { body } = request;
    const post = await postService.create(body);

    response.status(201).send({
      statusCode: 201,
      post,
    });
  } catch (e) {
    console.log(e);

    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updatePost = async (request, response) => {
  const { postId } = request.params;
  const { body } = request;
  try {
    const post = await postService.updatePost(postId, body);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: `Post with id ${postId} update successfully`,
      post,
    });
  } catch (e) {
    console.log(e);

    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deletePost = async (request, response) => {
  const { postId } = request.params;

  try {
    const post = await postService.deletePost(postId);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: `Post with id ${postId} deleted successfully`,
      post,
    });
  } catch (e) {
    console.log(e);

    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export const uploadCover = async (request, response) => {
  const { postId } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return response.status(400).json({ message: "invalid id" });
    }

    if (!request.file) {
      return response.status(400).json({ message: "file not uploaded" });
    }

    const post = await Posts.findByIdAndUpdate(
      postId,
      {
        cover: request.file.path,
      },
      { returnDocument: "after" },
    );

    if (!post) {
      return response.status(404).json({
        message: "post not found",
      });
    }

    response.status(200).json(post);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export default {
  findAll,
  findOne,
  create,
  updatePost,
  deletePost,
  uploadCover,
};
