import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../apis/blogApi';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([])

  useEffect(() => {
    fetchBlogs().then(res => {
      const blogs = res.data.blogs;
      setAllBlogs(blogs)
    });
  }, []);

  return (
    <div className="mt-8 px-[8%]">
      <h2 className="text-3xl pb-3 font-semibold">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBlogs?.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>

    </div>
  );
};

export default Blogs;
