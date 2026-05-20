import React from 'react'
import Hero from '../Home/Hero'
import FeaturedBlogs from '../Home/Featured';
import Categories from '../Home/Categories';
const Home = () => {
  return (
    <div>
      <Hero />  {/* Using the Hero component inside Home */}
      <FeaturedBlogs />
      <Categories />

    </div>
  );
};

export default Home;