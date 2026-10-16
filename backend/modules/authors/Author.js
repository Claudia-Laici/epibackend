import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type:String,
    unique:true,
  },
  dataDiNascita: {
    type: String,
  },
  avatar: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
});

authorSchema.pre("save", async function () {
if (!this.password || !this.isModified("password")) {
  return;
}
try {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
} catch (e) {
  throw e
}
})

authorSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate()

  if(update.password) {
    const hashedPassword = await bcrypt.hash(update.password, 10)

    this.setUpdate({
      ...update,
      password:hashedPassword
    })
  }
})

const Author = mongoose.model("Author", authorSchema);

export default Author;
