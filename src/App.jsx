import { useState } from 'react'
import './App.css'

export default function App() {
  const [Name, UpdatedName] = useState("");
  const [UserData, SetUserData] = useState(null);
  const [Error, SetError] = useState("");

  async function searchUser() {
    try {
      SetError("");
      SetUserData(null);

      const response = await fetch(
        `https://api.github.com/users/${Name}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      SetUserData(data);

    } catch (error) {
      SetError(error.message);
      SetUserData(null);
    }
  }

  return (
    <>
      <h1>Github Profile Finder</h1>

      <input
        type="text"
        placeholder="Enter Github Username"
        value={Name}
        onChange={(e) => UpdatedName(e.target.value)}
      />

      <button onClick={searchUser}>
        Search
      </button>

      {Error && (
        <p>{Error}</p>
      )}

      {UserData && (
        <pre>
          {JSON.stringify(UserData, null, 2)}
        </pre>
      )}
    </>
  );
}