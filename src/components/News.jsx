import React from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const News = () => {
    const { id } = useParams();
    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNew = async () => {
            try {
                const newdoc = doc(db, "news", id);
                const docSnap = await getDoc(newdoc);
                setNews(docSnap.data());
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("No se pudieron cargar las noticias. Por favor, inténtelo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchNew();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={news.imageUrl} alt={news.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4 text-blue-900">{news.title}</h1>
                    <p className="text-gray-500 mb-2">{new Date(news.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 leading-relaxed mb-6">{news.content}</p>
                </div>
            </div>
        </div>
    );
};

export default News;
