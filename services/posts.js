import Posts from "../modules/posts/Post.js";
import Author from "../modules/authors/Author.js";

const findAll = async (page, pageSize) => {
  const posts = await Posts.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("author", "nome cognome email");

  const totalPosts = await Posts.countDocuments();
  const totalPages = Math.ceil(totalPosts / pageSize);

  return {
    totalPosts,
    totalPages,
    items: posts,
  };
};

const findOne = async (id) => {
  return await Posts.findById(id);
};

const findByAuthor = async (authorId) => {
  return await Posts.find({ author: authorId });
};

const create = async (body) => {
  const authorId = body.author;
  const newPost = new Posts(body);
  const savedPost = await newPost.save();

  await Author.updateOne(
    { _id: authorId },
    { $push: { posts: savedPost._id } },
  );

  return savedPost;
};

const updatePost = async (id, body) => {
  const options = { new: true };
  return await Posts.findByIdAndUpdate(id, body, options);
};

const deletePost = async (id) => {
  const post = await Posts.findById(id);

  if (!post) {
    throw new Error("No posts found with the given ID");
  }

  await Posts.findByIdAndDelete(id);

  await Author.updateOne(
    { _id: post.author },
    {
      $pull: { posts: post._id },
    },
  );

  return post;
};

const filterBlog = async (title) => {
  return await Posts.find({
    title: { $regex: title, $options: "i" },
  });
};

export default {
  findAll,
  findOne,
  findByAuthor,
  create,
  updatePost,
  deletePost,
  filterBlog,
};
