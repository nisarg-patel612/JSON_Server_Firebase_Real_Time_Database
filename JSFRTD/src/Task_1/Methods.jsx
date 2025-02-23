import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JsonServerApp = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await axios.post('http://localhost:5000/users', { name });
    setName('');
    fetchUsers();
  };

  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
  };

  const updateUser = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/users/${editingId}`, { name });
      setEditingId(null);
      setName('');
      fetchUsers();
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-5">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      {editingId ? (
        <button onClick={updateUser}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JsonServerApp;
