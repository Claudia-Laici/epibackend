import Posts from "../modules/posts/Post.js"

const findAll = async (req, res) => {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10

    const posts = await Posts.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)

    const totalPosts = await Posts.countDocuments()
    const totalPages = Math.ceil(totalPosts / pageSize)

    res.status(200).json({
        totalPosts,
        totalPages,
        items: posts
    })
}

const findOne = async (id) => {
    return await Posts.findById(id)
}

const create = async (id) => {
    const newPost = new Posts(body)
    return await newPost.save()
}

const updatePost = async (id, body) => {
    const options = { new: true }
    return await Posts.findByIdAndUpdate(id, body, options)
}


export default {
    findAll,
    findOne,
    create,
    updatePost,
}