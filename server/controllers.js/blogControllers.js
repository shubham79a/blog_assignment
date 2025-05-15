import Blog from "../models/Blog.js";


export const saveDraft = async (req, res) => {
    const { id, content, tags, title } = req.body;
    if (!content || !title || !tags) {
        return res.json({
            success: false, message: "All things are required"
        })
    }
    const updatedAt = new Date()
    try {

        let blog = id
            ? await Blog.findByIdAndUpdate(id, { content, title, tags, updated_at: updatedAt, status: 'draft' })
            : await Blog.create({ content, title, tags, status: 'draft' }, { new: true })

        res.json({ success: true, blog, message: 'draft' })

    } catch (error) {
        console.log(error);
    }
}

export const publishBlog = async (req, res) => {
    const { id, title, content, tags } = req.body;
    const updatedAt = new Date()

    try {
        let blog = id
            ? await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'published', updated_at: updatedAt }, { new: true })
            : await Blog.create({ title, content, tags, status: 'published' })

        res.json(blog)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: err.message });
    }
}

export const getBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find().sort({ updated_at: -1 });
        res.json({ success: true, message: "all blogs found", blogs })

    } catch (error) {
        console.log(error);
    }
}


export const getBlogById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.json({ success: false, message: 'no blogs found' })
    }

    try {

        const blog = await Blog.findById(id)
        res.json({ success: true, message: 'blog found', blog })

    } catch (error) {
        console.log(error);
    }
}

