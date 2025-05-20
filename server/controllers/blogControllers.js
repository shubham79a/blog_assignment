import Blog from "../models/blog.js";
import mongoose from 'mongoose';


// Save or update a draft
export const saveDraft = async (req, res) => {
  const userId = req.user.id

  const { id, content, tags, title } = req.body;

  if (!content || !title || !tags) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const updatedAt = new Date();

  try {
    let blog;

    if (id) {
      blog = await Blog.findOneAndUpdate(
        { _id: id, author: req.userId }, // ✅ check author
        { content, title, tags, updated_at: updatedAt, status: 'draft' },
        { new: true }
      );
    } else {
      blog = await Blog.create({
        content,
        title,
        tags,
        status: 'draft',
        author: userId, // ✅ add user ID
      });
    }

    res.json({ success: true, blog, message: 'Draft saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Publish blog
export const publishBlog = async (req, res) => {
  const userId = req.user.id
  const { id, title, content, tags } = req.body;
  const updatedAt = new Date();

  if (!content || !title || !tags) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    let blog = id
      ? await Blog.findOneAndUpdate(
        { _id: id, author: userId }, // ✅ check author
        { title, content, tags, status: 'published', updated_at: updatedAt },
        { new: true }
      )
      :
      await Blog.create({
        title,
        content,
        tags,
        status: 'published',
        author: userId, // ✅ add user ID
      });


    res.json({ success: true, blog, message: 'Published successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all blogs (optional: filter by user)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find() // ✅ user's blogs only
      .sort({ updated_at: -1 });

    res.json({ success: true, message: "All blogs found", blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, message: 'Blog ID required' });
  }

  try {
    const blog = await Blog.findOne({ _id: id }); // ✅ secure access
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found or unauthorized' });
    }

    res.json({ success: true, message: 'Blog found', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const getBlogsUser = async (req, res) => {
  const userId = req.user.id
  console.log('====================================');
  console.log("ssss",userId);
  console.log('====================================');

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }

  try {
    const blogs = await Blog.find({ author: userId }).sort({ updated_at: -1 });
    res.json({ success: true, message: "User's blogs found", blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};