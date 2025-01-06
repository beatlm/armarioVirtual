import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { db } from '../lib/db';
import type { User } from '../types';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await db.execute('SELECT * FROM users');
      setUsers(result.rows as User[]);
    };
    loadUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Users className="w-8 h-8 mr-2 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Armario Virtual</h1>
      </div>
      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                to={`/user/${user.id}`}
                className="block hover:bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {user.name[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}