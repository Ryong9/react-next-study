import React from 'react'

export const SideMenu = () => {
  return (
    <div className="w-64 bg-gray-800 text-white hidden md:block h-full overflow-y-auto">
      <nav className="p-4 space-y-2">
        <a href="/" className="block py-2 px-4 text-lg hover:bg-gray-700">Home</a>
        <a href="paint" className="block py-2 px-4 text-lg hover:bg-gray-700">paint</a>
      </nav>
    </div>
  )
}