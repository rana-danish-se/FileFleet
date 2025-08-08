import React from 'react';

const Header = ({ category, size }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-4xl font-semibold">{category}</h1>
      <p>Total Size: {size} </p>
    </div>
  );
};

export default Header;
