import Comment from "../modules/comments/Comment.js";
const findAllComments = async (id) => {
  return await Comment.find({ post: id }).populate(
    "author",
    "nome cognome email",
  );
};

const findOneComment = async (id, commentId) => {
  return await Comment.findOne({
    _id: commentId,
    post: id,
  }).populate("author", "nome cognome email");
};

const createComment = async (id, body) => {
  const newComment = new Comment({
    ...body,
    post: id,
  });

  return await newComment.save();
};



const updateComment = async (id, commentId, body) => {
  return await Comment.findOneAndUpdate(
    { _id: commentId, post: id },
    {
      text: body.text,
      rate: body.rate,
    },
    { new: true, runValidators: true }
  ).populate("author", "nome cognome email");
};

const deleteComment = async (id, commentId) => {
  return await Comment.findOneAndDelete({
    _id: commentId,
    post: id,
  });
};

export default {
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
};
