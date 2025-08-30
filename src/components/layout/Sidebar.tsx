import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-50 w-full md:w-64 md:min-h-screen p-4">
      <nav className="space-y-2">
        <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md">
          Products
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;