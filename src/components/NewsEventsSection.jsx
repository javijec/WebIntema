import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NewsEventsSection() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('news')) || []
    setNews(storedNews.slice(0, 3)) // Mostrar solo las 3 noticias más recientes
  }, [])

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center text-blue-900">Noticias y Eventos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <p className="text-gray-700 mb-4">{item.content.substring(0, 100)}...</p>
                <Link to={`/news/${item.id}`} className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                  Leer más
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/news" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  )
}