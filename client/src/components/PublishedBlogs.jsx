import React, { useEffect, useState } from 'react'
import { fetchBlogs } from '../apis/blogApi';
import BlogCard from './BlogCard';

const PublishedBlogs = () => {
    const [published, setPublished] = useState([]);

    useEffect(() => {
        fetchBlogs().then(res => {
            const blogs = res.data.blogs;
            setPublished(blogs.filter(b => b.status === 'published'));
        });
    }, []);
    return (
        <div>
            <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-4">Published Blogs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {published.map(blog => <BlogCard key={blog._id} blog={blog} />)}
                </div>
            </div>
        </div>
    )
}

export default PublishedBlogs
