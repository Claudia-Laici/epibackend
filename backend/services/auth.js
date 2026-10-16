import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Author from "../modules/authors/Author.js";

const login = async ({ email, password }) => {
  const user = await Author.findOne({ email }).select("+password");

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
   { expiresIn: process.env.JWT_EXPIRESIN },
  );

  return token;
};

export default { login };