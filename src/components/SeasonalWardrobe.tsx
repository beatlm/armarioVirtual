import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { db } from '../lib/db';
import type { ClothingItem } from '../types';

export default function SeasonalWardrobe() {
  const { userId, season } = useParams();
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    size: '',
    imageUrl: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.execute({
      sql: 'INSERT INTO clothing_items (userId, title, size, season, imageUrl) VALUES (?, ?, ?, ?, ?)',
      args: [userId, newItem.title, newItem.size, season, newItem.imageUrl]
    });
    setNewItem({ title: '', size: '', imageUrl: '' });
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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
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
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Prenda</label>
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
              <label className="block text-sm font-medium mb-1">URL de la imagen</label>
              <input
                type="url"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600">Talla: {item.size}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 text-red-600 flex items-center"
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