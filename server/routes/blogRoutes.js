import express from "express";
import { getBlogById, getBlogs, publishBlog, saveDraft } from "../controllers.js/blogControllers.js";

const blogRouter = express.Router()

blogRouter.post('/save-draft', saveDraft)
blogRouter.post('/publish', publishBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getBlogById)

export default blogRouter

