import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/intema-logo.svg";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="logo" className="w-30" />
            <h1 className="text-3xl font-bold text-blue-900">INTEMA</h1>
          </div>
        </Link>
        <nav className="hidden lg:flex space-x-6 text-lg">
          <Link to="/" className="text-blue-900 hover:text-blue-700">
            Acerca de
          </Link>

          <Link to="/" className="text-blue-900 hover:text-blue-700">
            Investigación
          </Link>
          <Link to="/" className="text-blue-900 hover:text-blue-700">
            Educación
          </Link>
          <Link to="/" className="text-blue-900 hover:text-blue-700">
            Innovación
          </Link>
          <Link to="/" className="text-blue-900 hover:text-blue-700">
            Compromiso
          </Link>
        </nav>
      </div>
    </header>
  );
}
