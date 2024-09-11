import React from "react";

const discoverItems = [
  "Investigación de Vanguardia",
  "Programas de Posgrado",
  "Colaboraciones Industriales",
  "Publicaciones Científicas",
];

export default function DiscoverSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Descubre el INTEMA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discoverItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold mb-2">{item}</h4>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                Explorar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
