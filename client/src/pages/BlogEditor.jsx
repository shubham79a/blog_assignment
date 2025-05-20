import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import debounce from 'lodash.debounce';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

import { fetchBlogById, saveDraft, publishBlog } from '../apis/blogApi';

const BlogEditor = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  // Refs to track the latest state inside debounced function
  const titleRef = useRef(title);
  const tagsRef = useRef(tags);
  const contentRef = useRef(content);

  useEffect(() => {
    titleRef.current = title;
    tagsRef.current = tags;
    contentRef.current = content;
  }, [title, tags, content]);

  // Load blog if editing
  useEffect(() => {
    if (isEdit) {
      fetchBlogById(id).then(res => {
        const blog = res.data.blog;
        setTitle(blog?.title || '');
        setTags(blog?.tags?.join(', ') || '');
        setContent(blog?.content || '');
      }).catch(err => {
        console.error('Failed to load blog:', err);
      });
    }
  }, [id, isEdit]);

  // Debounced auto-save function
  const debouncedSave = useRef(
    debounce(() => {
      saveDraft({
        title: titleRef.current,
        tags: tagsRef.current,
        content: contentRef.current,
        id,
      }).then(() => {
        console.log('Auto-saved draft');
      }).catch(console.error);
    }, 5000)
  ).current;

  useEffect(() => {
    debouncedSave();
    return () => debouncedSave.cancel();
  }, [title, tags, content]);

  const handleSaveDraft = async () => {
    try {
      await saveDraft({ title, tags, content, id });
      alert('Draft Saved!');
    } catch (err) {
      console.error('Save draft error:', err);
    }
  };

  const handlePublish = async () => {
    try {
      await publishBlog({ title, tags, content, id });
      alert('Blog Published!');
    } catch (err) {
      console.error('Publish error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        className="w-full text-2xl mb-2 border-b"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full mb-2 border-b"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} />
      <div className="mt-4 flex gap-4">
        <button onClick={handleSaveDraft} className="btn">Save Draft</button>
        <button onClick={handlePublish} className="btn bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  );
};

export default BlogEditor;
