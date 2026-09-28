import { request, response } from "express"
import postService from "../services/posts.js"

const findAll = async (request, response) => {
    const { page = 1, pageSize = 10 } = request.query

    try {
        const {
            totalPosts,
            totalPages,
            items
        } = await postService.findAll(page, pageSize)

        if (items.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "No posts found"
            })
        }

        Response.status(200).send({
            statusCode: 200,
            totalPages,
            totalPosts,
            page: Number(page),
            pageSize: Number(pageSize),
            items
        })

    } catch (e) {
        console.log(e)

        response.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
}

const findOne = async (request,response) => {
    const { postId } = request.params

    try {
        const post = await postService.findOne(postId)

        if(!post) {
            return response.status(404)
            .send ({
                statusCode: 404,
                message: 'No post found with the given ID'
            })
        }

        response.statu(200)
        .send({
            statusCode: 200,
            post
        })

    } catch (e) {
        console.log(e)

        response.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
}

const create = async (request, response) => {
    try{
        const { body } = request
        const post = await postService.create(body)

        response.status(201)
        .send({
            statusCode: 201,
            post
        })

    } catch (e) {
        console.log(e)

        response.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
}

const updatePost = async (request, response) => {
    const { postId } = request.params
    const { body } = request
    try {
        const post = await postService.updatePost(postId, body)

        response.status(200)
        .send({
            statusCode: 200,
            message: `Post with id ${postId} update successfully`, 
            post
        })

    } catch (e) {
         console.log(e)

        response.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
}

export default {
    findAll,
    findOne,
    create,
    updatePost,
}