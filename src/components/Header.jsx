import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt="INTEMA Logo"
              className="h-15"
            />
            <h1 className="text-3xl font-bold text-blue-900">INTEMA</h1>
          </div>
        </Link>
        <nav className="hidden lg:flex space-x-6 text-lg">
          <a href="#" className="text-blue-900 hover:text-blue-700">
            Acerca de
          </a>
          <a href="#" className="text-blue-900 hover:text-blue-700">
            Investigación
          </a>
          <a href="#" className="text-blue-900 hover:text-blue-700">
            Educación
          </a>
          <a href="#" className="text-blue-900 hover:text-blue-700">
            Innovación
          </a>
          <a href="#" className="text-blue-900 hover:text-blue-700">
            Compromiso
          </a>
        </nav>
      </div>
    </header>
  );
}
