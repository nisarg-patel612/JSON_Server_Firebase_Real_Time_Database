import React, { useEffect, useState } from "react";
import { db, auth, googleProvider } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";

function CRUD() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

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
    setUser(null); // Clear user info on sign-out
  };

  const createUser = async () => {
    await addDoc(usersCollectionsRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionsRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <>
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

      <div>
        {user ? (
          <div>
            <h3>Welcome, {user.displayName}</h3>
            <button onClick={logout}>Sign out</button>
          </div>
        ) : (
          <button onClick={signupWithGoogle}>Sign in with Google</button>
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
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete User
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CRUD;
