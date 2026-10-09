import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  cognome: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dataDiNascita: {
    type: String,
  },
  avatar: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    default: [],
  }]
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
