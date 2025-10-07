import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../Layouts/AppLayout';

export default function CategoryPage() {
  const { categoryName } = useParams(); // grabs "sports", "party", etc.

  return (
    <AppLayout>
      <div className="page-container py-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Events
        </h1>

        {/* You can later fetch events from API based on categoryName */}
        <p className="text-center text-gray-700">All events for {categoryName} will show here.</p>
      </div>
    </AppLayout>
  );
}
