import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { useNavigate } from "react-router-dom";

export default function AllCategoriesPage() {
  const navigate = useNavigate();

  const categoryImages = {
    Sports: "/assets/sports.png",
    Party: "/assets/party.png",
    Concerts: "/assets/concerts.png",
    Tech: "/assets/tech.png",
    Religion: "/assets/religion.png",
    Education: "/assets/education.png",
  };

  return (
    <AppLayout>
      <div className="page-container py-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-12 text-center">
          All Event Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(categoryImages).map((category) => (
            <div
              key={category}
              onClick={() =>
                navigate(`/categories/${category.toLowerCase()}`)
              }
              className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={categoryImages[category]}
                alt={category}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-2xl sm:text-3xl font-bold">
                  {category}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
