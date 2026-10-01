import Posts from "../modules/posts/Post.js"

const findAll = async (page, pageSize) => {
    const posts = await Posts.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)

    const totalPosts = await Posts.countDocuments()
    const totalPages = Math.ceil(totalPosts / pageSize)

    return {
        totalPosts,
        totalPages,
        items: posts
    }
}

const findOne = async (id) => {
    return await Posts.findById(id)
}

const findByAuthor = async (email) => {
    return await Posts.find({ author: email })
}

const create = async (body) => {
    const newPost = new Posts(body)
    return await newPost.save()
}

const updatePost = async (id, body) => {
    const options = { new: true }
    return await Posts.findByIdAndUpdate(id, body, options)
}

const deletePost = async (id) => {
    return await Posts.findByIdAndDelete(id)
}

const filterBlog = async (title) => {
    return await Posts.find({
        title: { $regex: title, $options: "i" }
    })
}


export default {
    findAll,
    findOne,
    findByAuthor,
    create,
    updatePost,
    deletePost,
    filterBlog,
}