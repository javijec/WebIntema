import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import NewsEventsSection from "./components/NewsEventsSection";
import DiscoverSection from "./components/DiscoverSection";
import Footer from "./components/Footer";
import NewsPage from "./components/NewsPage";
import Admin from "./components/Admin";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex-grow">
                <HeroSection />
                <NewsEventsSection />
                <DiscoverSection />
              </main>
            }
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
