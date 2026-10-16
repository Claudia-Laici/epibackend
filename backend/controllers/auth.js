import Author from "../modules/authors/Author.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(request, response) {
  try {
    const { email, password } = request.body;
    const author = await Author.findOne({
      email,
    }).select("+password");

    if (!author) {
      return response.status(401).json({ message: "wrong credential" });
    }

    const result = await bcrypt.compare(password, author.password);

    if (!result) {
      return response.status(401).json({ message: "wrong credential" });
    }

    const token = await jwt.sign(
      {
        id: author._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIREIN }, // in fase di sviluppo 24h ma in produzione lo cambiamo a 30m
    );

    response.status(200).json({ token })

  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export async function me(request, response) {
  response.status(200).json(request.author)
}

