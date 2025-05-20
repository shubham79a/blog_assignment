import React from 'react'
import FeaturedBlogs from '../components/FeaturedBlogs'
import PublishedBlogs from '../components/PublishedBlogs'
import DraftBlogs from '../components/DraftBlogs'

const Home = () => {
  return (
    <div className='mx-[8%] mt-6'>

      <FeaturedBlogs />

      <PublishedBlogs />

      <DraftBlogs />

    </div>
  )
}

export default Home
