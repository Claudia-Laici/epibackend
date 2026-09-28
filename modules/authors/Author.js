import mongoose from "mongoose"


const authorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 50,
    },
    cognome: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 50,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    dataDiNascita: {
        type: String,
      
    },
    avatar: {
        type: String,
       
    }
})


const Author = mongoose.model("Author", authorSchema);

export default Author;