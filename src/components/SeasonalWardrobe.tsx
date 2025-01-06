import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2, Upload } from 'lucide-react';
import { db } from '../lib/db';
import type { ClothingItem } from '../types';

export default function SeasonalWardrobe() {
  const { userId, season } = useParams();
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    size: '',
    imageBase64: ''
  });

  useEffect(() => {
    loadItems();
  }, [userId, season]);

  const loadItems = async () => {
    const result = await db.execute({
      sql: 'SELECT * FROM clothing_items WHERE userId = ? AND season = ?',
      args: [userId, season]
    });
    setItems(result.rows as ClothingItem[]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, imageBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.execute({
      sql: 'INSERT INTO clothing_items (userId, title, size, season, imageUrl) VALUES (?, ?, ?, ?, ?)',
      args: [userId, newItem.title, newItem.size, season, newItem.imageBase64]
    });
    setNewItem({ title: '', size: '', imageBase64: '' });
    setShowForm(false);
    loadItems();
  };

  const handleDelete = async (itemId: number) => {
    await db.execute({
      sql: 'DELETE FROM clothing_items WHERE id = ?',
      args: [itemId]
    });
    loadItems();
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Ropa de {season === 'winter' ? 'Invierno' : 'Verano'}
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Añadir Prenda
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Talla</label>
              <input
                type="text"
                value={newItem.size}
                onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Foto</label>
              <div className="mt-1 flex items-center">
                <label className="block w-full">
                  <span className="sr-only">Elegir foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    required
                  />
                </label>
              </div>
              {newItem.imageBase64 && (
                <img
                  src={newItem.imageBase64}
                  alt="Preview"
                  className="mt-2 h-32 w-32 object-cover rounded"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">Talla: {item.size}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 text-red-600 flex items-center text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}