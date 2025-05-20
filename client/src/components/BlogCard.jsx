// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from './ui/button';

// const BlogCard = ({ blog }) => (
//     <div className="border rounded p-4 shadow hover:shadow-lg">
//         <h3 className="text-lg font-bold">{blog.title}</h3>
//         <p className="text-sm text-gray-500">{blog.tags?.join(', ')}</p>
//         {/* <p>{blog.content}</p> */}
//         <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
//         <Link to={`/blog-edit/${blog._id}`} className="text-blue-600">Edit</Link>
//         {/* <Button></Button> */}
//     </div>
// );

// export default BlogCard;



import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el && el.scrollHeight > el.clientHeight) {
      setIsOverflowing(true);
    }
  }, []);

  return (
    <div className="border rounded p-4 max-sm:p-2 shadow hover:scale-[101.5%] hover:shadow-xl transition-all duration-300 relative cursor-pointer">
      <h3 className="text-xl font-bold ">{blog.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{blog.tags?.join(' ')}</p>

      {/* Limited height + hidden overflow */}
      <div
        ref={contentRef}
        className="prose max-w-none max-h-14 overflow-hidden relative text-base text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Read more link shown if overflow exists */}
      {isOverflowing && (
        <div className="mt-2">
          <Link to={`/blog/${blog._id}`} className="text-gray-400 hover:text-gray-800 ">
            Read more →
          </Link>
        </div>
      )}

      {/* Edit link */}
      <div className="mt-2 flex justify-end ">
        <Link to={`/blog-edit/${blog._id}`} >
          <button className=" text-md border px-3.5 bg-black rounded-md text-white py-1 cursor-pointer hover:bg-gray-900">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
