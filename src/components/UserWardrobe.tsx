import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sun, Snowflake } from 'lucide-react';

export default function UserWardrobe() {
  const { userId } = useParams();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Selecciona una temporada</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link
          to={`/user/${userId}/winter`}
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Snowflake className="w-16 h-16 text-blue-500 mb-4" />
          <span className="text-xl font-semibold">Invierno</span>
        </Link>
        <Link
          to={`/user/${userId}/summer`}
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Sun className="w-16 h-16 text-yellow-500 mb-4" />
          <span className="text-xl font-semibold">Verano</span>
        </Link>
      </div>
    </div>
  );
}