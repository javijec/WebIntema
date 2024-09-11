import React from "react";

export default function TopBar() {
  return (
    <div className="bg-blue-900 text-white text-sm">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Estudiantes
          </a>
          <a href="#" className="hover:underline">
            Personal
          </a>
          <a href="#" className="hover:underline">
            Alumni
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Mapa del sitio
          </a>
          <button className="flex items-center text-white hover:text-blue-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
