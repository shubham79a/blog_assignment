import express from "express";
import { getBlogById, getBlogs, getBlogsUser, publishBlog, saveDraft } from "../controllers/blogControllers.js";
import authenticate from "../middlewares/auth.js";

const blogRouter = express.Router()

blogRouter.post('/save-draft', authenticate, saveDraft)
blogRouter.post('/publish', authenticate, publishBlog)
blogRouter.post('/me', authenticate, getBlogsUser)
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getBlogById)

export default blogRouter

