import mongoose from "mongoose";

const categoriesEnum = ['horror', 'scifi', 'romance']
const readTimeUnitEnum = ['minutes', 'hours', 'days']

const PostSchema = new mongoose.Schema({

    category: {
        type: String,
        enum: categoriesEnum,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false,
        default: 'https://picsum.photos/200/300'
    },
    readTime: {
        value: {
            type: Number,
            required: false,
            default: 0,
        },
        unit: {
            type: String,
            enum: readTimeUnitEnum,
            required: false,
            default: 'minutes'
        }

    },
    author: {
        type: String,
        required: false,
        default: 'No Author'
    }

}, { timestamps: true, strict: true })

export default mongoose.model("post", PostSchema, "posts")