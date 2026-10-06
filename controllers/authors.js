import mongoose from "mongoose";
import postService from "../services/posts.js";
import Author from "../modules/authors/Author.js";
import sendGrid from "@sendgrid/mail"

export async function getAllAuthors(req, res) {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createAuthors(req, res) {
  try {
    const { nome, cognome, email, dataDiNascita, avatar } = req.body;

    const author = new Author({ nome, cognome, email, dataDiNascita, avatar });

    const savedAuthor = await author.save();

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: author.email,
       from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Benvenuto su StriveBlog",
      text: "Grazie per esserti registrato sul nostro Blog",
      html: "Grazie per esserti registrato sul nostro Blog"
    }

    await sendGrid.send(msg)
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAuthorById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateAuthor(req, res) {
  try {
    const { id } = req.params;
    const { nome, cognome, email, dataDiNascita, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { nome, cognome, email, dataDiNascita, avatar },
      { returnDocument: "after" },
    );
    if (!updatedAuthor) {
      return res.status(404).json({ message: "author not found" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteAuthor(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAuthorBlogPosts(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid id",
      });
    }

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const posts = await postService.findByAuthor(author.email);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const uploadAvatar = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid id" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "file not uploaded" });
    }

    const author = await Author.findByIdAndUpdate(
      id,
      {
        avatar: req.file.path,
      },
      { returnDocument: "after" },
    );

    if (!author) {
      return res.status(404).json({
        message: "author not found",
      });
    }

    res.status(200).json(author);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
