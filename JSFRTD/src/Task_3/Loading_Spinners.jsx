import React, { useEffect, useState } from "react";
import { db, auth, googleProvider } from "../Task_2/firebase"; 
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import './Loading_Spinners.css';

function CRUD() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const usersCollectionsRef = collection(db, "users");

  
  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);  
    } catch (error) {
      console.error("Error during Google sign-in: ", error.message);
    }
  };

  
  const logout = () => {
    signOut(auth);
    setUser(null);  
  };

  const createUser = async () => {
    try {
      await addDoc(usersCollectionsRef, { name: newName, age: Number(newAge) });
    } catch (error) {
      console.error("Error creating user: ", error.message);
    }
  };

  const updateUser = async (id, age) => {
    try {
      const userDoc = doc(db, "users", id);
      const newFields = { age: age + 1 };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.error("Error updating user: ", error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.error("Error deleting user: ", error.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); 
      try {
        const data = await getDocs(usersCollectionsRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setError(null); 
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching users: ", err.message);
      } finally {
        setLoading(false); 
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          <button onClick={logout}>Sign out</button>
        </div>
      ) : (
        <button onClick={signupWithGoogle}>Sign in with Google</button>
      )}

      {loading && <div className="spinner">Loading...</div>} 

      {error && <div className="error-message">{error}</div>} 

      {user && (
        <div>
          <input
            type="text"
            placeholder="Name...."
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age..."
            onChange={(e) => setNewAge(e.target.value)}
          />
          <button onClick={createUser}>Create User</button>
        </div>
      )}

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button onClick={() => { deleteUser(user.id); }}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default CRUD;
