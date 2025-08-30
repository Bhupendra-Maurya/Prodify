import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">Prodify Dashboard</h1>
        <div className="text-xs md:text-sm text-gray-500 hidden sm:block">Product Management System</div>
      </div>
    </header>
  );
};

export default Header;