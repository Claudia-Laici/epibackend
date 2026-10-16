import jwt from "jsonwebtoken";
import Author from "../modules/authors/Author.js";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token non valido",
    });
  }

  const jwtToken = authHeader.split(" ")[1];
  jwt.verify(jwtToken, process.env.JWT_SECRET, async function (error, payload) {
    if (error) {
      return res.status(401).json({
        message: "Token non valido",
      });
    }
    try {
      const { id } = payload;

      const author = await Author.findById(id);
      if (!author) {
        return res.status(401).json({
          message: "Autore non trovato",
        });
      }
      req.author = author;
      next();
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  });
}
