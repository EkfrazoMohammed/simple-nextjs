import React from 'react';

import Link from 'next/link';
const Home = () => {
  return (
    <div>
      <h1>Welcome to Aventura Holidays</h1>
      <Link href="/all-destinations">/all-destinations</Link>
    </div>
  );
};

export default Home;
