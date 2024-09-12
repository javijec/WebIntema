import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase"; // Asegúrate de que esta ruta sea correcta

export default function Admin() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const newsCollection = collection(db, "news");
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNews(newsList);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Error al cargar las noticias. Por favor, revisa tu conexión y los permisos de Firebase.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let imageUrl = "/placeholder.svg?height=200&width=300";

    try {
      if (image) {
        const storageRef = ref(storage, `news/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const newNews = {
        title,
        content,
        imageUrl,
        date: new Date().toISOString(),
      };

      await addDoc(collection(db, "news"), newNews);
      await fetchNews(); // Recargar las noticias después de agregar una nueva
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error adding news:", error);
      setError("Error al agregar la noticia. Por favor, revisa los permisos de Firebase y tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    setLoading(true);
    setError(null);
    try {
      // Borrar el documento de Firestore
      await deleteDoc(doc(db, "news", id));

      // Borrar la imagen de Storage si no es la imagen por defecto
      if (imageUrl !== "/placeholder.svg?height=200&width=300") {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      // Actualizar el estado local
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
      setError("Error al eliminar la noticia. Por favor, revisa los permisos de Firebase y tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Noticias</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading && (
        <div className="text-center">
          <p className="text-gray-500">Cargando...</p>
        </div>
      )}

      {/* Formulario para agregar noticias */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Contenido
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows="3"></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}>
          {loading ? "Agregando..." : "Agregar Noticia"}
        </button>
      </form>

      {/* Tabla de noticias existentes */}
      <h2 className="text-2xl font-bold mb-4">Noticias Existentes</h2>
      {news.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(item.id, item.imageUrl)}
                    className="text-red-600 hover:text-red-900"
                    disabled={loading}>
                    {loading ? "Eliminando..." : "Eliminar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay noticias para mostrar.</p>
      )}
    </div>
  );
}
