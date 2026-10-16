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
  return await Posts.findById(id).populate(
    "author",
    "nome cognome email"
  );
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

const updatePost = async (id, authorId, body) => {
  return await Posts.findOneAndUpdate(
    { _id: id, author: authorId },
    body,
    { new: true, runValidators: true }
  );
};


const deletePost = async (id, authorId) => {
  const post = await Posts.findOneAndDelete({
    _id: id,
    author: authorId,
  });


  if (!post) {
    throw new Error("No posts found with the given ID");
  }

  await Author.updateOne(
    { _id: authorId },
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
