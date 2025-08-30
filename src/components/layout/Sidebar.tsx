import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-50 w-64 min-h-screen p-4 hidden md:block">
      <nav className="space-y-2">
        <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md">
          Products
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;