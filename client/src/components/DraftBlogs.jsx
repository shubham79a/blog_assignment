import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import { fetchBlogs } from '../apis/blogApi';

const DraftBlogs = () => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        fetchBlogs().then(res => {
            const blogs = res.data.blogs;
            setDrafts(blogs.filter(b => b.status === 'draft'));
        });
    }, []);
    return (
        <div>
            <div className="mb-16">
                <h2 className="text-3xl font-semibold mb-4">Draft Blogs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drafts?.map(blog => <BlogCard key={blog._id} blog={blog} />)}
                </div>
            </div>
        </div>
    )
}

export default DraftBlogs
